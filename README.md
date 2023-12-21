# :art: mt-image-classifier

Demo：https://mt-image-classifier.netlify.app/

基於 **Vue 3** 所製作，可自行訓練辨識模型之圖片分類辨識!

![image](https://raw.githubusercontent.com/motea927/mt-image-classifier/main/demoImg/demo.png)

## :page_facing_up: 技術

【前端】

- **Vue 3**：前端 MVVM 框架，搭配 Composition API 進行開發
- **Vue Router**：路由狀態管理
- **Vite**：新一代 Vue build tool & dev server
- **Tailwind CSS**：新一代工具類 CSS 框架
- **Prettier**：程式碼格式化工具
- **ml5.js**：前端智慧化工具，基於 TensorFlow.js 開發而成

## :pencil2: 收穫

1. 運用 Composition API
2. 了解 Vite 與 Vue cli 差異
3. 前端智慧化，簡化前端機器學習開發流程

## :pencil: 細節

1. 圖片辨識(預設)頁面：使用 ml5 預設模組進行辨識
2. 訓練模型頁面：可自行上傳圖片訓練，檔名規則爲[label]\_\*，如 貓咪\_1.png、狗狗\_2.png ...等
3. 圖片辨識(自定)頁面：自行訓練之模型，目前爲天氣辨識，可辨識 1.雨天 2.多雲 3.日出 4.晴天 四種類型

## :coffee: 本地開發步驟

```bash
# 安裝模組
$ npm install
```

```bash
# 本地載入伺服
$ npm run dev
```
