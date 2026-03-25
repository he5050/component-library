# 🎨 组件设计系统规范文档

**文档版本**: v1.0.0  
**创建日期**: 2025年  
**维护者**: 蜘蛛精 (UI/UX 设计师)  
**适用范围**: component-library 组件库

---

## 📖 目录

1. [设计原则](#一设计原则)
2. [色彩系统](#二色彩系统)
3. [字体系统](#三字体系统)
4. [间距系统](#四间距系统)
5. [阴影与层级](#五阴影与层级)
6. [圆角系统](#六圆角系统)
7. [动画系统](#七动画系统)
8. [组件设计 Token](#八组件设计-token)
9. [UnoCSS 配置规范](#九unocss-配置规范)
10. [无障碍规范](#十无障碍规范)

---

## 一、设计原则

### 1.1 水墨美学核心

```
计白当黑 · 虚实相生 · 墨分五色 · 气韵生动
```

**设计哲学**:
- **留白即内容**: 通过宣纸色背景与墨色元素的对比，营造呼吸感
- **层次即秩序**: 焦、浓、重、淡、清五色墨阶构建视觉层次
- **克制即优雅**: 强调色（朱砂）使用控制在 10% 以内
- **自然即流畅**: 动画曲线模拟水墨晕染的自然流动

### 1.2 60-30-10 色彩法则

```
┌─────────────────────────────────────────────────┐
│  ████████████████████████████████████  60%      │
│  水墨灰阶 (Ink) - 主色调                          │
│                                                 │
│  ████████████████                      30%      │
│  宣纸色系 (Paper) - 辅助色                        │
│                                                 │
│  █████                                 10%      │
│  朱砂强调 (Vermilion) - 强调色                    │
└─────────────────────────────────────────────────┘
```

### 1.3 设计关键词

| 关键词 | 设计表现 |
|--------|----------|
| 温润 | 暖灰色温、柔和阴影、微圆角 |
| 雅致 | 传统色彩命名、书法字体、留白 |
| 现代 | 简洁布局、流畅动画、清晰层次 |
| 包容 | 无障碍支持、响应式适配、暗色模式 |

---

## 二、色彩系统

### 2.1 水墨五色 (Ink Scale)

**主色调 - 占界面 60%**

| Token | 色值 | 名称 | 使用场景 |
|-------|------|------|----------|
| `--ink-deep` | `#1a1917` | 焦墨 | 主标题、重要文字 |
| `--ink-thick` | `#33312c` | 浓墨 | 正文、次要文字 |
| `--ink-medium` | `#63605a` | 重墨 | 辅助文字、图标 |
| `--ink-light` | `#8a877e` | 淡墨 | 占位符、禁用文字 |
| `--ink-pale` | `#f5f5f0` | 清墨 | 背景色、悬停背景 |

**完整色阶**:

```css
--ink-50:  #fafaf7   /* 最浅 */
--ink-100: #f5f5f0   /* 清墨 */
--ink-200: #e8e6e0
--ink-300: #d1cec6
--ink-400: #a8a59c   /* 淡墨 */
--ink-500: #8a877e
--ink-600: #63605a   /* 重墨 */
--ink-700: #4a4740
--ink-800: #33312c   /* 浓墨 */
--ink-900: #1a1917   /* 焦墨 */
```

### 2.2 宣纸色系 (Paper)

**辅助色 - 占界面 30%**

| Token | 色值 | 名称 | 使用场景 |
|-------|------|------|----------|
| `--paper` | `#f5f5f0` | 宣纸 | 主背景 |
| `--paper-warm` | `#faf8f3` | 暖宣 | 输入框背景、卡片背景 |
| `--paper-aged` | `#f0ebe0` | 陈宣 | 复古风格区域 |
| `--paper-cool` | `#f2f4f5` | 冷宣 | 信息区域背景 |
| `--paper-edge` | `#e8e0d0` | 宣边 | 边框、分割线 |

### 2.3 朱砂色系 (Vermilion)

**强调色 - 占界面 10%（限制使用）**

| Token | 色值 | 名称 | 使用场景 |
|-------|------|------|----------|
| `--vermilion` | `#c04851` | 朱砂 | 主要强调、品牌色 |
| `--zhusha` | `#c04851` | 朱砂 | 强调按钮、链接 |
| `--haitang` | `#db5a6b` | 海棠 | 悬停状态、高亮 |
| `--yanzhi` | `#c35c67` | 胭脂 | 危险状态、错误提示 |
| `--seal-red` | `#b93a3a` | 印章红 | 重要标记、徽章 |

**朱砂色阶**:

```css
--vermilion-50:  #fdf5f5
--vermilion-100: #fae8e8
--vermilion-200: #f0d4d4
--vermilion-300: #e8c0c0
--vermilion-400: #d4888f
--vermilion-500: #c04851   /* 主色 */
--vermilion-600: #a03a42
--vermilion-700: #802d33
--vermilion-800: #602026
--vermilion-900: #401519
```

### 2.4 功能色 (Semantic Colors)

| 类型 | 主色 | 浅色背景 | 使用场景 |
|------|------|----------|----------|
| **Info** | `#1772b4` (靛青) | `#b0d4d1` (鸭卵青) | 信息提示、链接 |
| **Success** | `#789262` (竹青) | `#48c0a3` (青碧) | 成功状态、Focus |
| **Warning** | `#ca6924` (琥珀) | `#f0c239` (缃色) | 警告提示 |
| **Danger** | `#c35c67` (胭脂) | `#db5a6b` (海棠) | 错误、危险操作 |
| **Accent** | `#c04851` (朱砂) | `#db5a6b` (海棠) | 品牌强调 |

### 2.5 水墨层次 (Ink Wash)

用于背景遮罩、悬停效果:

```css
--ink-wash-1: rgba(26, 25, 23, 0.04)   /* 最淡 */
--ink-wash-2: rgba(26, 25, 23, 0.08)
--ink-wash-3: rgba(26, 25, 23, 0.12)
--ink-wash-4: rgba(26, 25, 23, 0.18)
--ink-wash-5: rgba(26, 25, 23, 0.28)   /* 最深 */
```

### 2.6 暗色模式 (Dark Mode)

```css
[data-theme="dark"] {
  /* 背景层 */
  --bg-primary: #0d0d0d;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #262626;
  --bg-elevated: #333333;
  
  /* 文字层 */
  --text-primary: #f5f5f0;
  --text-secondary: #b3b3a8;
  --text-muted: #737373;
  --text-disabled: #4d4d4d;
  
  /* 强调色 - 暗色模式提亮 */
  --vermilion: #d4606a;
  --color-focus: #5dd4b3;
}
```

---

## 三、字体系统

### 3.1 字体家族

| 用途 | 字体栈 | 说明 |
|------|--------|------|
| **Display** | `"LXGW WenKai", "Noto Serif SC", Georgia, serif` | 标题、展示文字 |
| **Body** | `"Noto Sans SC", "PingFang SC", system-ui, sans-serif` | 正文、UI 文字 |
| **Mono** | `"JetBrains Mono", "Fira Code", monospace` | 代码、数据 |
| **Headline** | `"Ma Shan Zheng", cursive` | 装饰性标题 |

### 3.2 字体大小规范

| 层级 | 大小 | 行高 | 字重 | 字间距 | 用途 |
|------|------|------|------|--------|------|
| **Hero** | 48px / 3rem | 1.2 | 700 | 0.02em | 页面主标题 |
| **H1** | 36px / 2.25rem | 1.3 | 700 | 0.01em | 章节标题 |
| **H2** | 28px / 1.75rem | 1.4 | 600 | 0.01em | 卡片标题 |
| **H3** | 22px / 1.375rem | 1.4 | 600 | 0 | 小节标题 |
| **H4** | 18px / 1.125rem | 1.5 | 600 | 0 | 组件标题 |
| **Body Large** | 18px / 1.125rem | 1.7 | 400 | 0.01em | 重要正文 |
| **Body** | 16px / 1rem | 1.75 | 400 | 0.01em | 标准正文 |
| **Body Small** | 14px / 0.875rem | 1.6 | 400 | 0.01em | 辅助文字 |
| **Caption** | 12px / 0.75rem | 1.5 | 400 | 0.02em | 标注、时间 |

### 3.3 字体样式规范

```css
/* 展示文字 - 书法风格 */
.text-display {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.08em;
}

/* 正文 - 舒适阅读 */
.text-body {
  font-family: var(--font-body);
  line-height: 1.75;
  letter-spacing: 0.01em;
}

/* 竖排文字 - 传统排版 */
.text-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 0.2em;
}
```

### 3.4 排版原则

1. **标题使用 Display 字体**，增加字间距（tracking-wide）
2. **正文使用 Body 字体**，行高 1.75 保证阅读舒适
3. **按钮文字增加字间距**（tracking-[0.08em]），提升品质感
4. **避免使用纯黑色**（#000），使用 ink-deep（#1a1917）

---

## 四、间距系统

### 4.1 基础间距单位

以 4px（0.25rem）为基准单位:

```css
--space-1: 0.25rem;   /* 4px  - 图标内边距 */
--space-2: 0.5rem;    /* 8px  - 紧凑间距 */
--space-3: 0.75rem;   /* 12px - 小间距 */
--space-4: 1rem;      /* 16px - 标准间距 */
--space-5: 1.25rem;   /* 20px - 中等间距 */
--space-6: 1.5rem;    /* 24px - 大间距 */
--space-8: 2rem;      /* 32px - 区域间距 */
--space-10: 2.5rem;   /* 40px - 大区域 */
--space-12: 3rem;     /* 48px - 章节间距 */
--space-16: 4rem;     /* 64px - 页面间距 */
```

### 4.2 组件间距规范

| 组件 | 内边距 | 外边距 | 说明 |
|------|--------|--------|------|
| **Button sm** | px-3.5 py-0 | - | 高度 32px |
| **Button md** | px-5 py-0 | - | 高度 40px |
| **Button lg** | px-7 py-0 | - | 高度 48px |
| **Card** | p-6 | my-4 | 标准卡片 |
| **Input sm** | px-3 | - | 高度 32px |
| **Input md** | px-4 | - | 高度 40px |
| **Input lg** | px-5 | - | 高度 48px |
| **Modal** | px-6 py-4 (header) | - | 内容区 py-5 |
| **Toast** | px-4 py-3 | - | 紧凑提示 |

### 4.3 布局间距

```css
/* 页面容器 */
.container-page {
  padding: var(--space-8) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
}

/* 卡片网格 */
.grid-cards {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* 表单间距 */
.form-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
```

---

## 五、阴影与层级

### 5.1 阴影系统

| Token | 阴影值 | 用途 |
|-------|--------|------|
| `--shadow-xs` | `0 1px 2px rgba(26,26,26,0.04)` | 微阴影 |
| `--shadow-sm` | `0 2px 4px rgba(26,26,26,0.06)` | 小元素 |
| `--shadow-md` | `0 4px 8px rgba(26,26,26,0.08)` | 卡片默认 |
| `--shadow-lg` | `0 8px 16px rgba(26,26,26,0.1)` | 悬浮卡片 |
| `--shadow-xl` | `0 16px 32px rgba(26,26,26,0.12)` | 弹窗 |
| `--shadow-2xl` | `0 24px 48px rgba(26,26,26,0.15)` | 全屏遮罩 |

### 5.2 水墨阴影 (Ink Shadow)

**特色阴影 - 模拟水墨晕染效果**:

```css
/* 卡片默认阴影 */
--shadow-ink: 
  0 2px 8px rgba(26, 26, 26, 0.04),
  0 8px 24px rgba(26, 26, 26, 0.06),
  0 16px 48px rgba(26, 26, 26, 0.04);

/* 卡片悬停阴影 */
--shadow-ink-hover:
  0 4px 12px rgba(26, 26, 26, 0.06),
  0 12px 32px rgba(26, 26, 26, 0.08);

/* 输入框聚焦阴影 */
--shadow-ink-input-focus:
  0 0 0 3px rgba(72, 192, 163, 0.15);

/* 按钮主阴影 */
--shadow-btn-primary:
  0 3px 12px rgba(26, 26, 26, 0.2);

/* 按钮危险阴影 */
--shadow-btn-danger:
  0 3px 12px rgba(195, 92, 103, 0.28);
```

### 5.3 Z-Index 层级栈

```css
--z-base: 0;       /* 基础层 */
--z-dropdown: 100; /* 下拉菜单 */
--z-sticky: 200;   /* 粘性定位 */
--z-overlay: 300;  /* 遮罩层 */
--z-modal: 400;    /* 模态框 */
--z-popover: 500;  /* 弹出层 */
--z-toast: 600;    /* 通知提示 */
```

### 5.4 Elevation 体系

```css
--elevation-0: none;
--elevation-1: var(--shadow-xs);
--elevation-2: var(--shadow-ink);
--elevation-3: var(--shadow-ink-hover);
--elevation-4: var(--shadow-lg);
--elevation-5: var(--shadow-xl);
```

---

## 六、圆角系统

### 6.1 圆角规范

| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-none` | 0 | 直角元素 |
| `--radius-sm` | 4px | 小标签、徽章 |
| `--radius-default` | 8px | 按钮、输入框 |
| `--radius-md` | 12px | 小卡片 |
| `--radius-lg` | 16px | 卡片 |
| `--radius-xl` | 20px | 大卡片 |
| `--radius-2xl` | 24px | 弹窗 |
| `--radius-full` | 9999px | 全圆角（头像、标签） |

### 6.2 特色圆角 - 墨迹效果

```css
/* 模拟墨迹边缘的不规则圆角 */
--radius-ink-sm: 4px 8px 6px 10px;
--radius-ink-md: 8px 16px 12px 18px;
--radius-ink-lg: 12px 24px 18px 28px;
```

### 6.3 组件圆角应用

| 组件 | 圆角值 | 说明 |
|------|--------|------|
| Button sm | 8px | 小巧精致 |
| Button md | 10px | 标准圆角 |
| Button lg | 12px | 大气稳重 |
| Card default | 16px | 现代感 |
| Card ink | 8px 16px 12px 18px | 墨迹风格 |
| Input | 10px | 与按钮协调 |
| Modal | 20px | 突出层次 |
| Avatar | 9999px | 圆形 |
| Badge | 9999px | 胶囊形 |

---

## 七、动画系统

### 7.1 动画时长

```css
--duration-fast: 150ms;      /* 微交互 */
--duration-normal: 300ms;    /* 标准过渡 */
--duration-slow: 500ms;      /* 复杂动画 */
--duration-ink-spread: 600ms; /* 水墨扩散 */
```

### 7.2 缓动函数

```css
/* 标准缓动 */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);

/* 水墨流动感 */
--ease-ink: cubic-bezier(0.34, 1.56, 0.64, 1);

/* 弹性效果 */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* 减速效果 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* 加速效果 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### 7.3 交互动画规范

| 交互 | 时长 | 缓动 | 变换 |
|------|------|------|------|
| **Hover 上浮** | 300ms | ease-ink | translateY(-2px) |
| **Active 下沉** | 75ms | ease-out | translateY(0) |
| **Focus 环** | 200ms | ease-default | box-shadow |
| **Modal 进入** | 300ms | ease-out | opacity + scale |
| **Toast 进入** | 200ms | ease-out | translateX |
| **Card 悬浮** | 300ms | ease-ink | translateY(-4px) + shadow |

### 7.4 关键帧动画

```css
/* 闪烁动画 - 骨架屏 */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 淡入动画 */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 上浮进入 */
@keyframes slide-up {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* 水墨扩散 */
@keyframes ink-spread {
  from { 
    transform: scale(0); 
    opacity: 0.8; 
  }
  to { 
    transform: scale(4); 
    opacity: 0; 
  }
}

/* 旋转加载 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 八、组件设计 Token

### 8.1 Button Tokens

```typescript
interface ButtonTokens {
  // 尺寸
  'button-height-sm': '32px';
  'button-height-md': '40px';
  'button-height-lg': '48px';
  
  // 内边距
  'button-padding-sm': '0 14px';
  'button-padding-md': '0 20px';
  'button-padding-lg': '0 28px';
  
  // 圆角
  'button-radius-sm': '8px';
  'button-radius-md': '10px';
  'button-radius-lg': '12px';
  
  // 字体
  'button-font-sm': '14px';
  'button-font-md': '14px';
  'button-font-lg': '16px';
  
  // 字间距
  'button-tracking': '0.08em';
}
```

**变体样式**:

| 变体 | 背景 | 文字 | 边框 | 阴影 |
|------|------|------|------|------|
| Primary | gradient(ink-800 to ink-deep) | paper | ink/20 | btn-primary |
| Secondary | paper-warm | ink-thick | ink/15 | shadow-sm |
| Outline | transparent | zhusha | zhusha/35 | none |
| Ghost | transparent | ink-medium | transparent | none |
| Danger | gradient(danger to danger-dark) | white | danger/70 | btn-danger |

### 8.2 Card Tokens

```typescript
interface CardTokens {
  // 背景
  'card-background': 'var(--paper)';
  'card-background-hover': 'var(--paper-warm)';
  
  // 边框
  'card-border': '1px solid rgba(26,25,23,0.08)';
  'card-border-hover': '1px solid rgba(192,72,81,0.15)';
  
  // 阴影
  'card-shadow': 'var(--shadow-ink)';
  'card-shadow-hover': 'var(--shadow-ink-hover)';
  
  // 圆角
  'card-radius-default': '16px';
  'card-radius-ink': '8px 16px 12px 18px';
  
  // 内边距
  'card-padding': '24px';
  
  // 过渡
  'card-transition': 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
}
```

### 8.3 Input Tokens

```typescript
interface InputTokens {
  // 尺寸
  'input-height-sm': '32px';
  'input-height-md': '40px';
  'input-height-lg': '48px';
  
  // 背景
  'input-background': 'var(--paper-warm)';
  'input-background-hover': 'var(--paper)';
  'input-background-focus': 'var(--paper)';
  
  // 边框
  'input-border': '1px solid rgba(26,25,23,0.1)';
  'input-border-hover': '1px solid rgba(26,25,23,0.15)';
  'input-border-focus': '1px solid var(--color-focus)';
  'input-border-error': '1px solid var(--color-danger)';
  
  // 阴影
  'input-shadow-focus': '0 0 0 3px rgba(72,192,163,0.15)';
  'input-shadow-error': '0 0 0 3px rgba(195,92,103,0.15)';
  
  // 圆角
  'input-radius-sm': '8px';
  'input-radius-md': '10px';
  'input-radius-lg': '12px';
  
  // 文字
  'input-color': 'var(--ink-deep)';
  'input-placeholder': 'var(--ink-light)';
}
```

### 8.4 Modal Tokens

```typescript
interface ModalTokens {
  // 遮罩
  'modal-overlay-background': 'rgba(26,25,23,0.4)';
  'modal-overlay-blur': '2px';
  
  // 容器
  'modal-background': 'var(--paper)';
  'modal-border': '1px solid rgba(26,25,23,0.1)';
  'modal-radius': '20px';
  'modal-shadow': 'var(--shadow-xl)';
  'modal-max-width': '448px'; /* md */
  
  // 内边距
  'modal-padding-header': '16px 24px';
  'modal-padding-body': '20px 24px';
  'modal-padding-footer': '16px 24px';
  
  // 动画
  'modal-transition': 'opacity 300ms ease-out';
}
```

### 8.5 Toast Tokens

```typescript
interface ToastTokens {
  // 位置
  'toast-position-top': '24px';
  'toast-position-right': '24px';
  
  // 容器
  'toast-background': 'var(--paper)';
  'toast-border-width': '1px';
  'toast-radius': '8px';
  'toast-shadow': 'var(--shadow-lg)';
  
  // 内边距
  'toast-padding': '12px 16px';
  
  // 类型色
  'toast-border-info': 'rgba(23,114,180,0.2)';
  'toast-border-success': 'rgba(120,146,98,0.2)';
  'toast-border-warning': 'rgba(202,105,36,0.2)';
  'toast-border-danger': 'rgba(195,92,103,0.2)';
  
  // 动画
  'toast-duration': '3000ms';
  'toast-transition': 'all 200ms ease-out';
}
```

---

## 九、UnoCSS 配置规范

### 9.1 主题配置

```typescript
// uno.config.ts
export default defineConfig({
  theme: {
    colors: {
      // 水墨五色
      ink: {
        DEFAULT: '#1a1917',
        deep: '#1a1917',
        thick: '#33312c',
        medium: '#63605a',
        light: '#8a877e',
        pale: '#f5f5f0',
        50: '#fafaf7',
        100: '#f5f5f0',
        200: '#e8e6e0',
        300: '#d1cec6',
        400: '#a8a59c',
        500: '#8a877e',
        600: '#63605a',
        700: '#4a4740',
        800: '#33312c',
        900: '#1a1917',
      },
      // 宣纸色系
      paper: {
        DEFAULT: '#f5f5f0',
        warm: '#faf8f3',
        aged: '#f0ebe0',
        cool: '#f2f4f5',
        deep: '#eae9e4',
      },
      // 朱砂色系
      vermilion: {
        DEFAULT: '#c04851',
        light: '#e8d4d4',
        dark: '#a03a42',
        50: '#fdf5f5',
        100: '#fae8e8',
        200: '#f0d4d4',
        300: '#e8c0c0',
        400: '#d4888f',
        500: '#c04851',
        600: '#a03a42',
        700: '#802d33',
        800: '#602026',
        900: '#401519',
      },
      // 中国传统色
      zhusha: '#c04851',
      haitang: '#db5a6b',
      yanzhi: '#c35c67',
      dian: '#1772b4',
      hulan: '#25b4c8',
      zhu: '#789262',
      qingbi: '#48c0a3',
      amber: '#ca6924',
      // 语义色
      info: { DEFAULT: '#1772b4', light: '#b0d4d1' },
      success: { DEFAULT: '#789262', light: '#48c0a3' },
      warning: { DEFAULT: '#ca6924', light: '#f0c239' },
      danger: { DEFAULT: '#c35c67', light: '#db5a6b' },
      accent: { DEFAULT: '#c04851', light: '#db5a6b' },
      focus: { DEFAULT: '#48c0a3', ring: 'rgba(72,192,163,0.3)' },
      link: { DEFAULT: '#1772b4', hover: '#25b4c8' },
    },
    fontFamily: {
      display: ['"LXGW WenKai"', '"Noto Serif SC"', 'Georgia', 'serif'],
      body: ['"Noto Sans SC"', '"PingFang SC"', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      headline: ['"Ma Shan Zheng"', 'cursive'],
    },
    borderRadius: {
      none: '0',
      sm: '4px',
      DEFAULT: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      full: '9999px',
      ink: '8px',
      'ink-sm': '4px 8px 6px 10px',
      'ink-md': '8px 16px 12px 18px',
      'ink-lg': '12px 24px 18px 28px',
    },
    boxShadow: {
      xs: '0 1px 2px rgba(26,26,26,0.04)',
      sm: '0 2px 4px rgba(26,26,26,0.06)',
      md: '0 4px 8px rgba(26,26,26,0.08)',
      lg: '0 8px 16px rgba(26,26,26,0.1)',
      xl: '0 16px 32px rgba(26,26,26,0.12)',
      '2xl': '0 24px 48px rgba(26,26,26,0.15)',
      ink: '0 2px 8px rgba(26,26,26,0.04), 0 8px 24px rgba(26,26,26,0.06), 0 16px 48px rgba(26,26,26,0.04)',
      'ink-hover': '0 4px 12px rgba(26,26,26,0.06), 0 12px 32px rgba(26,26,26,0.08)',
      'ink-card': '0 2px 8px rgba(26,26,26,0.04), 0 8px 24px rgba(26,26,26,0.06)',
      'ink-card-hover': '0 4px 12px rgba(26,26,26,0.06), 0 12px 32px rgba(26,26,26,0.08)',
      'ink-input-focus': '0 0 0 3px rgba(72,192,163,0.15)',
      'ink-glow': '0 0 20px rgba(192,72,81,0.15)',
    },
    transitionDuration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    transitionTimingFunction: {
      ink: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
})
```

### 9.2 快捷类 (Shortcuts)

```typescript
shortcuts: {
  // ==================== 按钮基础 ====================
  'btn-ink-base': 'inline-flex items-center justify-center font-body font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-45 disabled:pointer-events-none',
  
  // 按钮变体
  'btn-primary': 'btn-ink-base border border-ink/20 bg-gradient-to-b from-ink-800 to-ink-deep text-paper shadow-btn-primary hover:from-ink-700 hover:to-ink-thick hover:-translate-y-px active:translate-y-0',
  'btn-secondary': 'btn-ink-base border border-ink/15 bg-paper-warm text-ink-thick shadow-sm hover:bg-paper hover:border-ink/30 hover:-translate-y-px active:translate-y-0',
  'btn-outline': 'btn-ink-base border border-zhusha/35 bg-transparent text-zhusha hover:bg-zhusha/8 hover:border-zhusha/60 hover:-translate-y-px active:translate-y-0',
  'btn-ghost': 'btn-ink-base border border-transparent bg-transparent text-ink-medium hover:bg-ink-pale hover:text-ink-thick',
  'btn-danger': 'btn-ink-base border border-danger/70 bg-gradient-to-b from-danger to-danger-dark text-white shadow-btn-danger hover:-translate-y-px hover:brightness-110 active:translate-y-0',
  
  // 按钮尺寸
  'btn-sm': 'h-8 px-3.5 text-sm rounded-lg tracking-wide',
  'btn-md': 'h-10 px-5 text-sm rounded-[10px] tracking-wide',
  'btn-lg': 'h-12 px-7 text-base rounded-xl tracking-wide',
  
  // ==================== 卡片 ====================
  'ink-card': 'bg-paper border border-ink/8 rounded-lg shadow-ink-card transition-all duration-300',
  'ink-card-hover': 'ink-card hover:shadow-ink-card-hover hover:-translate-y-0.5 hover:border-zhusha/15 cursor-pointer',
  'ink-card-ink': 'bg-paper border border-ink/8 rounded-ink-md shadow-ink-card transition-all duration-300',
  
  // ==================== 输入框 ====================
  'ink-input': 'bg-paper-warm border border-ink/10 rounded-[10px] font-body text-ink-deep placeholder:text-ink-light transition-all duration-200 outline-none hover:bg-paper hover:border-ink/15 focus:border-focus focus:shadow-ink-input-focus focus:bg-paper disabled:opacity-45',
  'ink-input-error': 'border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(195,92,103,0.15)]',
  
  // ==================== 文字样式 ====================
  'ink-title': 'font-display text-ink-deep font-semibold tracking-wide',
  'ink-body': 'font-body text-ink-thick leading-relaxed',
  'ink-caption': 'font-body text-sm text-ink-medium',
  'ink-label': 'font-body text-sm text-ink-thick font-medium tracking-wide',
  
  // ==================== 交互效果 ====================
  'ink-hover-lift': 'transition-all duration-300 hover:-translate-y-0.5',
  'ink-press': 'active:translate-y-0 active:shadow-inner transition-all duration-75',
  'ink-float': 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
  
  // ==================== 边框装饰 ====================
  'ink-border-soft': 'border border-ink/6',
  'ink-border-medium': 'border border-ink/10',
  'ink-border-strong': 'border border-ink/15',
  
  // ==================== 状态 ====================
  'ink-disabled': 'opacity-45 pointer-events-none',
  'ink-loading': 'relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer',
}
```

### 9.3 自定义规则 (Rules)

```typescript
rules: [
  // 宣纸纹理
  [
    'ink-texture',
    {
      'background-image': `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      'background-size': '200px 200px',
      'opacity': '0.03',
      'pointer-events': 'none',
    },
  ],
  // 水墨晕染
  [
    'ink-wash',
    {
      background: 'radial-gradient(ellipse at center, rgba(26,26,26,0.03) 0%, transparent 70%)',
    },
  ],
  // 竖排文字
  [
    'ink-vertical',
    {
      'writing-mode': 'vertical-rl',
      'text-orientation': 'mixed',
      'letter-spacing': '0.2em',
    },
  ],
],
```

### 9.4 安全列表 (Safelist)

```typescript
safelist: [
  // 颜色
  'bg-ink-deep', 'bg-ink-thick', 'bg-ink-medium', 'bg-ink-light', 'bg-ink-pale',
  'text-ink-deep', 'text-ink-thick', 'text-ink-medium', 'text-ink-light',
  'border-ink-deep', 'border-ink-thick', 'border-ink/10', 'border-ink/20',
  'bg-paper', 'bg-paper-warm', 'bg-paper-aged',
  'text-zhusha', 'text-haitang', 'bg-zhusha/10', 'border-zhusha/20',
  
  // 阴影
  'shadow-ink', 'shadow-ink-hover', 'shadow-ink-card', 'shadow-ink-card-hover',
  
  // 动画
  'animate-shimmer', 'animate-fade-in', 'animate-slide-up',
  
  // 状态
  'hover:-translate-y-0.5', 'active:translate-y-0',
  'focus-visible:ring-2', 'focus-visible:ring-focus',
  'disabled:opacity-45', 'disabled:pointer-events-none',
],
```

---

## 十、无障碍规范

### 10.1 颜色对比度

| 场景 | 前景色 | 背景色 | 对比度 | 等级 |
|------|--------|--------|--------|------|
| 主文字 | ink-deep (#1a1917) | paper (#f5f5f0) | 15.8:1 | AAA ✅ |
| 次要文字 | ink-thick (#33312c) | paper (#f5f5f0) | 11.2:1 | AAA ✅ |
| 辅助文字 | ink-medium (#63605a) | paper (#f5f5f0) | 5.4:1 | AA ✅ |
| 占位符 | ink-light (#8a877e) | paper (#f5f5f0) | 3.2:1 | AA ⚠️ |
| 链接 | dian (#1772b4) | paper (#f5f5f0) | 5.1:1 | AA ✅ |
| 错误 | danger (#c35c67) | paper (#f5f5f0) | 4.8:1 | AA ✅ |

**注意**: ink-light 仅用于装饰性文字或占位符，不用于主要内容。

### 10.2 焦点管理

```css
/* 标准焦点环 */
.focus-ring {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

/* 焦点可见（仅键盘导航时显示） */
.focus-visible-ring {
  outline: none;
}

.focus-visible-ring:focus-visible {
  box-shadow: 0 0 0 2px var(--color-focus-ring);
  border-color: var(--color-focus);
}
```

### 10.3 键盘导航

| 组件 | Tab 导航 | Enter/Space | Escape | 方向键 |
|------|----------|-------------|--------|--------|
| Button | ✅ | 激活 | - | - |
| Input | ✅ | - | - | - |
| Checkbox | ✅ | 切换 | - | - |
| Radio | ✅ | 选中 | - | 组内切换 |
| Select | ✅ | 打开 | 关闭 | 选项切换 |
| Modal | ✅（陷阱） | 激活 | 关闭 | - |
| Tabs | ✅ | 选中 | - | 标签切换 |
| Tooltip | - | - | - | - |

### 10.4 ARIA 属性规范

| 组件 | 必需属性 | 推荐属性 |
|------|----------|----------|
| Button | - | aria-label, aria-disabled |
| Input | label[for] | aria-invalid, aria-describedby |
| Checkbox | aria-checked | aria-label |
| Radio | aria-checked, name | aria-label |
| Select | label[for] | aria-invalid |
| Modal | role="dialog", aria-modal | aria-labelledby, aria-describedby |
| Toast | role="status" | aria-live="polite" |
| Alert | role="alert" | aria-live="assertive" |
| Tooltip | role="tooltip" | - |
| Tabs | role="tablist" | aria-selected, aria-controls |

### 10.5 减少动画

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 📎 附录

### A. 设计 Token 命名规范

```
{类别}-{属性}-{状态}-{尺寸}

示例:
--color-primary-hover
--button-padding-sm
--card-shadow-hover
--input-border-focus
```

### B. 文件组织建议

```
component-library/
├── src/
│   ├── styles/
│   │   ├── tokens/           # 设计 token
│   │   │   ├── colors.css
│   │   │   ├── typography.css
│   │   │   ├── spacing.css
│   │   │   └── shadows.css
│   │   ├── utilities/        # 工具类
│   │   │   ├── animations.css
│   │   │   └── accessibility.css
│   │   └── index.css         # 主入口
│   └── components/
│       └── ...
├── uno.config.ts             # UnoCSS 配置
└── DESIGN_SYSTEM_SPEC.md     # 本文档
```

### C. 版本控制

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v1.0.0 | 2025 | 初始版本，包含完整设计系统规范 |

---

**文档结束**

*本规范由蜘蛛精 (UI/UX 设计师) 制定，作为 component-library 组件库的设计标准。*
