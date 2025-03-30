
// 這個文件將來將用於與後端 API 進行通信以保存文章內容

export interface ArticleData {
  content: string;
  title?: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// 這是一個模擬函數，將來需要替換為實際的 API 調用
export const saveArticleContent = async (content: string): Promise<ArticleData> => {
  // 模擬 API 調用的延遲
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 在正式環境中，這將是對後端 API 的實際調用
  // 例如：
  // const response = await fetch('/api/articles', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ content }),
  // });
  // return response.json();

  // 暫時返回模擬數據
  return {
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// 將來從資料庫獲取文章的函數
export const getArticleContent = async (id: number): Promise<ArticleData> => {
  // 模擬 API 調用的延遲
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 在正式環境中，這將是對後端 API 的實際調用
  // 例如：
  // const response = await fetch(`/api/articles/${id}`);
  // return response.json();

  // 暫時返回模擬數據
  return {
    content: '<p>這是從服務器加載的示例內容</p>',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
