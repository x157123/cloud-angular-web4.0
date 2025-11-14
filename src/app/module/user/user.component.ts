import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { HttpGlobalTool } from "@http/HttpGlobalTool";
import Editor from '@hufe921/canvas-editor';

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'input-error-state-matcher-example',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasEditor', { static: false }) canvasEditorRef!: ElementRef;

  private editorInstance: Editor | null = null;

  constructor(private httpGlobalTool: HttpGlobalTool) {}

  ngAfterViewInit(): void {
    // 在视图初始化后初始化编辑器
    this.initializeEditor();
  }

  private initializeEditor(): void {
    if (!this.canvasEditorRef) {
      console.error('Canvas editor element not found');
      return;
    }

    try {
      // 创建编辑器实例
      this.editorInstance = new Editor(this.canvasEditorRef.nativeElement, {
        main: [
          {
            value: 'Hello World'
          },
          {
            value: '\n'
          },
          {
            value: '这是一个富文本编辑器示例',
            bold: true
          }
        ],
      });

      console.log('Canvas editor initialized successfully', this.editorInstance);

      // 可以在这里添加事件监听或其他初始化逻辑
      this.setupEditorListeners();

    } catch (error) {
      console.error('Failed to initialize canvas editor:', error);
    }
  }

  private setupEditorListeners(): void {
    // 如果需要监听编辑器事件,可以在这里添加
    // 例如:内容变化、焦点事件等
  }

  // ============ 公共方法 ============

  /**
   * 获取编辑器内容
   */
  public getContent(): any {
    if (!this.editorInstance) {
      console.warn('Editor instance not initialized');
      return null;
    }
    return this.editorInstance.command.getValue();
  }

  /**
   * 设置编辑器内容
   */
  public setContent(content: any[]): void {
    if (!this.editorInstance) {
      console.warn('Editor instance not initialized');
      return;
    }
  }

  /**
   * 清空编辑器内容
   */
  public clearContent(): void {
    if (!this.editorInstance) {
      console.warn('Editor instance not initialized');
      return;
    }
  }

  /**
   * 插入文本
   */
  public insertText(text: string): void {
    if (!this.editorInstance) {
      console.warn('Editor instance not initialized');
      return;
    }
    this.editorInstance.command.executeInsertElementList([
      { value: text }
    ]);
  }

  /**
   * 执行加粗
   */
  public executeBold(): void {
    this.editorInstance?.command.executeBold();
  }

  /**
   * 执行斜体
   */
  public executeItalic(): void {
    this.editorInstance?.command.executeItalic();
  }

  /**
   * 执行下划线
   */
  public executeUnderline(): void {
    this.editorInstance?.command.executeUnderline();
  }

  /**
   * 增加字体大小
   */
  public executeSizeAdd(): void {
    this.editorInstance?.command.executeSizeAdd();
  }

  /**
   * 减小字体大小
   */
  public executeSizeMinus(): void {
    this.editorInstance?.command.executeSizeMinus();
  }

  /**
   * 设置字体颜色
   */
  public executeColor(color: string): void {
    this.editorInstance?.command.executeColor(color);
  }

  /**
   * 插入表格
   */
  public insertTable(row: number, col: number): void {
    this.editorInstance?.command.executeInsertTable(row, col);
  }

  /**
   * 导出为图片
   */
  public async exportAsImage(): Promise<void> {

  }

  /**
   * 打印
   */
  public print(): void {
    this.editorInstance?.command.executePrint();
  }

  /**
   * 保存内容到服务器
   */
  public async saveToServer(): Promise<void> {
    const content = this.getContent();
    if (!content) {
      console.warn('No content to save');
      return;
    }

    try {
      // 使用你的 HttpGlobalTool 保存数据
      // 示例:
      // const response = await this.httpGlobalTool.post('/api/save-document', {
      //   content: content
      // });
      // console.log('Document saved successfully', response);

      console.log('Content to save:', content);
      alert('保存成功!');
    } catch (error) {
      console.error('Failed to save document:', error);
      alert('保存失败!');
    }
  }

  /**
   * 从服务器加载内容
   */
  public async loadFromServer(documentId: string): Promise<void> {
    try {
      // 使用你的 HttpGlobalTool 加载数据
      // 示例:
      // const response = await this.httpGlobalTool.get(`/api/load-document/${documentId}`);
      // this.setContent(response.content);

      console.log('Loading document:', documentId);
    } catch (error) {
      console.error('Failed to load document:', error);
      alert('加载失败!');
    }
  }

  ngOnDestroy(): void {
    // 清理编辑器实例
    if (this.editorInstance) {
      this.editorInstance.destroy?.();
      this.editorInstance = null;
    }
  }
}
