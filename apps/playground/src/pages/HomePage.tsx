import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-primary-900 mb-2">
            Component Library
          </h1>
          <p className="text-lg text-primary-700">
            在 Obsidian 中预览 React 组件
          </p>
        </div>
      </header>

      <main className="flex-1 px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-primary-100">
            <h2 className="text-2xl font-display font-semibold text-primary-900 mb-4">
              使用方式
            </h2>
            <p className="text-primary-700 mb-6">
              在 Obsidian 笔记中使用以下语法引用组件：
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-primary-600 mb-2 uppercase tracking-wide">
                  语法一：行内组件
                </h3>
                <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                  <code className="text-primary-800 font-mono text-sm">
                    ::component[Button]{"{variant=\"primary\"}"}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-primary-600 mb-2 uppercase tracking-wide">
                  语法二：代码块
                </h3>
                <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                  <code className="text-primary-800 font-mono text-sm whitespace-pre">
{`组件库预览.md

本文档展示如何在 Obsidian 中使用组件预览功能。

## 基础用法

### 按钮组件

::component[Button]{variant="primary"}

::component[Button]{variant="secondary"}

::component[Button]{variant="outline"}

::component[Button]{variant="ghost"}

::component[Button]{variant="danger"}`}
                  </code>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-primary-100">
            <h2 className="text-2xl font-display font-semibold text-primary-900 mb-4">
              Button 组件预览
            </h2>
            <p className="text-primary-700 mb-6">
              点击下方链接查看不同样式的 Button 组件：
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/preview/Button?variant=primary" 
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Primary
              </Link>
              <Link 
                to="/preview/Button?variant=secondary" 
                className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium border border-primary-200"
              >
                Secondary
              </Link>
              <Link 
                to="/preview/Button?variant=outline" 
                className="inline-flex items-center px-4 py-2 bg-transparent text-primary rounded-lg hover:bg-primary-50 transition-colors font-medium border-2 border-primary"
              >
                Outline
              </Link>
              <Link 
                to="/preview/Button?variant=ghost" 
                className="inline-flex items-center px-4 py-2 bg-transparent text-primary-700 rounded-lg hover:bg-primary-50 transition-colors font-medium"
              >
                Ghost
              </Link>
              <Link 
                to="/preview/Button?variant=danger" 
                className="inline-flex items-center px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Danger
              </Link>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-primary-100">
            <h2 className="text-2xl font-display font-semibold text-primary-900 mb-4">
              尺寸选项
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to="/preview/Button?size=sm" 
                className="inline-flex items-center px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium"
              >
                Small
              </Link>
              <Link 
                to="/preview/Button?size=md" 
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Medium
              </Link>
              <Link 
                to="/preview/Button?size=lg" 
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-lg font-medium"
              >
                Large
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-primary-100">
        <div className="max-w-4xl mx-auto text-center text-primary-600 text-sm">
          Component Library Preview System
        </div>
      </footer>
    </div>
  )
}

export default HomePage
