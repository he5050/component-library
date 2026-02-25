import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-ink-deep mb-3 tracking-wide">
            水墨组件库
          </h1>
          <p className="text-lg text-ink-medium font-body">
            计白当黑 · 淡雅素净 · 现代交互
          </p>
        </div>
      </header>

      <main className="flex-1 px-6 pb-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <section className="ink-card p-8">
            <h2 className="text-xl font-display font-semibold text-ink-deep mb-4">
              使用方式
            </h2>
            <p className="text-ink-thick mb-6 leading-relaxed">
              在 Obsidian 笔记中使用以下语法引用组件预览：
            </p>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-medium text-ink-medium mb-2 uppercase tracking-wider">
                  方式一：行内语法
                </h3>
                <div className="bg-ink-pale rounded-lg p-4 border border-ink/5">
                  <code className="text-ink-thick text-sm">
                    ::component[Button]{"{variant=\"primary\"}"}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-ink-medium mb-2 uppercase tracking-wider">
                  方式二：代码块
                </h3>
                <div className="bg-ink-pale rounded-lg p-4 border border-ink/5">
                  <pre className="text-ink-thick text-sm m-0 bg-transparent p-0">
{`组件库预览.md

本文档展示如何在 Obsidian 中使用组件预览功能。

## 基础用法

### 按钮组件

::component[Button]{variant="primary"}

::component[Button]{variant="secondary"}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="ink-card p-8">
            <h2 className="text-xl font-display font-semibold text-ink-deep mb-4">
              Button 组件预览
            </h2>
            <p className="text-ink-thick mb-6 leading-relaxed">
              点击下方链接查看不同样式的 Button 组件：
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/preview/Button?variant=primary"
                className="inline-flex items-center px-4 py-2 bg-ink-deep text-paper rounded-ink hover:bg-ink-thick transition-all duration-200 font-medium shadow-ink hover:shadow-ink-hover hover:-translate-y-0.5"
              >
                Primary
              </Link>
              <Link
                to="/preview/Button?variant=secondary"
                className="inline-flex items-center px-4 py-2 bg-ink-pale text-ink-deep rounded-ink hover:bg-ink-200 transition-all duration-200 font-medium border border-ink/10"
              >
                Secondary
              </Link>
              <Link
                to="/preview/Button?variant=outline"
                className="inline-flex items-center px-4 py-2 bg-transparent text-ink-deep rounded-ink hover:bg-ink-pale transition-all duration-200 font-medium border-2 border-ink/20"
              >
                Outline
              </Link>
              <Link
                to="/preview/Button?variant=ghost"
                className="inline-flex items-center px-4 py-2 bg-transparent text-ink-thick rounded-ink hover:bg-ink-pale transition-all duration-200 font-medium"
              >
                Ghost
              </Link>
              <Link
                to="/preview/Button?variant=danger"
                className="inline-flex items-center px-4 py-2 bg-vermilion text-white rounded-ink hover:bg-vermilion-dark transition-all duration-200 font-medium shadow-ink hover:shadow-ink-hover hover:-translate-y-0.5"
              >
                Danger
              </Link>
            </div>
          </section>

          <section className="ink-card p-8">
            <h2 className="text-xl font-display font-semibold text-ink-deep mb-4">
              尺寸选项
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/preview/Button?size=sm"
                className="inline-flex items-center px-3 py-1.5 bg-ink-pale text-ink-deep rounded hover:bg-ink-200 transition-colors text-sm font-medium"
              >
                Small
              </Link>
              <Link
                to="/preview/Button?size=md"
                className="inline-flex items-center px-4 py-2 bg-ink-deep text-paper rounded-ink hover:bg-ink-thick transition-colors font-medium"
              >
                Medium
              </Link>
              <Link
                to="/preview/Button?size=lg"
                className="inline-flex items-center px-6 py-3 bg-ink-deep text-paper rounded-lg hover:bg-ink-thick transition-colors text-lg font-medium"
              >
                Large
              </Link>
            </div>
          </section>

          <section className="ink-card p-8">
            <h2 className="text-xl font-display font-semibold text-ink-deep mb-4">
              设计理念
            </h2>
            <div className="space-y-4 text-ink-thick leading-relaxed">
              <p>
                <span className="text-ink-deep font-medium">水墨五色</span> — 焦墨、浓墨、重墨、淡墨、清墨，构建层次分明的视觉体系。
              </p>
              <p>
                <span className="text-ink-deep font-medium">计白当黑</span> — 以留白为设计语言，追求淡雅素净的空灵感。
              </p>
              <p>
                <span className="text-ink-deep font-medium">朱砂点缀</span> — 以朱砂红为强调色，如印章落款，画龙点睛。
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-ink/5">
        <div className="max-w-3xl mx-auto text-center text-ink-light text-sm">
          水墨组件库 · 融合传统美学与现代交互
        </div>
      </footer>
    </div>
  )
}

export default HomePage
