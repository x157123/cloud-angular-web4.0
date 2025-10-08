# Angular Control Flow Migration Script
# 将 *ngIf 和 *ngFor 迁移到新的 @if 和 @for 语法

$files = Get-ChildItem -Path "src/app" -Include "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content

    # 转换 *ngFor (简单情况)
    # *ngFor="let item of items" -> @for (item of items; track item)
    $content = $content -replace '\*ngFor="let\s+(\w+)\s+of\s+([^"]+)"', '@for ($1 of $2; track $$1)'

    # 转换 *ngFor with index
    # *ngFor="let item of items; index as i" -> @for (item of items; track item; let i = $index)
    $content = $content -replace '\*ngFor="let\s+(\w+)\s+of\s+([^;]+);\s*index\s+as\s+(\w+)"', '@for ($1 of $2; track $$1; let $3 = $$index)'

    # 转换 *ngFor with track by (需要手动调整)
    $content = $content -replace '\*ngFor="let\s+(\w+)\s+of\s+([^;]+);\s*trackBy:\s*(\w+)"', '@for ($1 of $2; track $3($$index, $$1))'

    # 转换简单的 *ngIf
    # *ngIf="condition" -> @if (condition) {
    $content = $content -replace '(<[^>]+)\s*\*ngIf="([^"]+)"([^>]*>)', '$1$3@if ($2) {#CLOSE#}'

    # 转换 <ng-container *ngFor="...">
    $content = $content -replace '<ng-container\s+\*ngFor="let\s+(\w+)\s+of\s+([^"]+)"\s*>', '@for ($1 of $2; track $$1) {'
    $content = $content -replace '</ng-container>\s*<!--\s*ngFor\s*-->', '}'

    # 转换 <ng-container *ngIf="...">
    $content = $content -replace '<ng-container\s+\*ngIf="([^"]+)"\s*>', '@if ($1) {'
    $content = $content -replace '</ng-container>\s*<!--\s*ngIf\s*-->', '}'

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Migration complete!"
