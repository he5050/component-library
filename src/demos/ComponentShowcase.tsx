import { useState } from "react"
import {
  Button,
  Card,
  Input,
  Badge,
  Divider,
  Tooltip,
  Loading,
} from "../components"
import {
  Search,
  Mail,
  Lock,
  User,
  Check,
  X,
  Sparkles,
  Palette,
  Type,
  MousePointer,
} from "lucide-react"

/**
 * 组件展示页面
 * 展示所有水墨国风组件的精致细节
 */
function ComponentShowcase() {
  const [inputValue, setInputValue] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-12">
      {/* 标题区 */}
      <div className="text-center space-y-4">
        <Badge variant="seal" size="md" animate>
          组件展示
        </Badge>
        <h1 className="text-3xl font-display font-bold text-ink-deep">
          水墨组件库
        </h1>
        <p className="text-ink-medium max-w-lg mx-auto">
          融合传统水墨美学与现代交互设计，打造层次分明的精致界面体验
        </p>
      </div>

      <Divider variant="brush" />

      {/* Button 展示 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <MousePointer className="w-5 h-5 text-vermilion" />
          <h2 className="text-xl font-display font-semibold text-ink-deep">
            按钮 Button
          </h2>
        </div>

        <Card variant="wash" className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">变体</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">主要按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">描边按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="danger">危险按钮</Button>
            </div>
          </div>

          <Divider variant="dashed" />

          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">尺寸</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">小按钮</Button>
              <Button size="md">中按钮</Button>
              <Button size="lg">大按钮</Button>
            </div>
          </div>

          <Divider variant="dashed" />

          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">状态</h3>
            <div className="flex flex-wrap gap-3">
              <Button disabled>禁用状态</Button>
              <Button>
                <Check className="w-4 h-4" />
                带图标
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <Divider variant="elegant" />

      {/* Card 展示 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-vermilion" />
          <h2 className="text-xl font-display font-semibold text-ink-deep">
            卡片 Card
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            variant="default"
            header={<h3 className="font-semibold text-ink-deep">默认卡片</h3>}
            footer={<span className="text-sm text-ink-light">卡片底部</span>}
          >
            <p className="text-ink-medium">
              这是默认样式的卡片，带有精致的阴影和悬停效果。
              鼠标悬停时会看到优雅的浮起动画。
            </p>
          </Card>

          <Card
            variant="elevated"
            header={<h3 className="font-semibold text-ink-deep">浮起卡片</h3>}
          >
            <p className="text-ink-medium">
              浮起卡片具有更强的阴影效果，适合作为主要内容容器。
            </p>
          </Card>

          <Card
            variant="outlined"
            header={<h3 className="font-semibold text-ink-deep">描边卡片</h3>}
          >
            <p className="text-ink-medium">
              描边卡片采用简洁的边框设计，适合轻量级内容展示。
            </p>
          </Card>

          <Card
            variant="wash"
            header={<h3 className="font-semibold text-ink-deep">晕染卡片</h3>}
          >
            <p className="text-ink-medium">
              晕染卡片带有水墨渐变背景，营造传统书画的意境。
            </p>
          </Card>
        </div>
      </section>

      <Divider variant="elegant" />

      {/* Input 展示 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Type className="w-5 h-5 text-vermilion" />
          <h2 className="text-xl font-display font-semibold text-ink-deep">
            输入框 Input
          </h2>
        </div>

        <Card className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="默认输入框"
              placeholder="请输入内容..."
              helperText="这是辅助说明文字"
            />

            <Input
              label="带前缀后缀"
              placeholder="搜索..."
              prefix={<Search className="w-4 h-4" />}
              suffix={<Badge size="sm">Ctrl+K</Badge>}
            />

            <Input
              label="幽灵输入框"
              variant="ghost"
              placeholder="幽灵样式..."
            />

            <Input
              label="下划线输入框"
              variant="underline"
              placeholder="下划线样式..."
            />

            <Input
              label="错误状态"
              placeholder="输入有误"
              error="请输入有效的邮箱地址"
              defaultValue="invalid-email"
            />

            <Input
              label="禁用状态"
              placeholder="不可编辑"
              disabled
              defaultValue="已禁用"
            />
          </div>
        </Card>
      </section>

      <Divider variant="elegant" />

      {/* Badge 展示 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-vermilion" />
          <h2 className="text-xl font-display font-semibold text-ink-deep">
            标签 Badge
          </h2>
        </div>

        <Card className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">变体</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="seal" animate>印章</Badge>
              <Badge variant="outline">描边</Badge>
              <Badge variant="subtle">柔和</Badge>
              <Badge variant="dot" dot>圆点</Badge>
            </div>
          </div>

          <Divider variant="dashed" />

          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">尺寸</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge size="sm">小标签</Badge>
              <Badge size="md">中标签</Badge>
              <Badge size="lg">大标签</Badge>
            </div>
          </div>
        </Card>
      </section>

      <Divider variant="elegant" />

      {/* Divider 展示 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-5 border-t-2 border-vermilion" />
          <h2 className="text-xl font-display font-semibold text-ink-deep">
            分割线 Divider
          </h2>
        </div>

        <Card className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">默认</h3>
            <Divider variant="default" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">笔触</h3>
            <Divider variant="brush" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">优雅</h3>
            <Divider variant="elegant" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">虚线</h3>
            <Divider variant="dashed" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink-medium mb-4">带文字</h3>
            <Divider text="水墨分割线" />
          </div>
        </Card>
      </section>

      <Divider variant="elegant" />

      {/* Tooltip 展示 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-5 rounded-full bg-vermilion/20 flex items-center justify-center">
            <span className="text-xs text-vermilion">?</span>
          </div>
          <h2 className="text-xl font-display font-semibold text-ink-deep">
            提示框 Tooltip
          </h2>
        </div>

        <Card>
          <div className="flex flex-wrap gap-6 items-center justify-center py-8">
            <Tooltip content="默认样式的提示框" placement="top">
              <Button variant="outline" size="sm">上方提示</Button>
            </Tooltip>

            <Tooltip content="水墨风格的提示框" placement="bottom" variant="ink">
              <Button variant="outline" size="sm">下方提示</Button>
            </Tooltip>

            <Tooltip content="印章风格的提示框" placement="left" variant="seal">
              <Button variant="outline" size="sm">左侧提示</Button>
            </Tooltip>

            <Tooltip content="右侧显示的提示框" placement="right">
              <Button variant="outline" size="sm">右侧提示</Button>
            </Tooltip>
          </div>
        </Card>
      </section>

      <Divider variant="elegant" />

      {/* Loading 展示 */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-5 rounded-full border-2 border-vermilion border-t-transparent animate-spin" />
          <h2 className="text-xl font-display font-semibold text-ink-deep">
            加载 Loading
          </h2>
        </div>

        <Card>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            <div className="flex flex-col items-center gap-4">
              <Loading variant="spinner" size="md" />
              <span className="text-sm text-ink-light">旋转</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Loading variant="dots" size="md" />
              <span className="text-sm text-ink-light">墨点</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Loading variant="ink" size="md" />
              <span className="text-sm text-ink-light">晕染</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Loading variant="seal" size="md" />
              <span className="text-sm text-ink-light">印章</span>
            </div>
          </div>

          <Divider variant="dashed" />

          <div className="flex justify-center py-4">
            <Loading variant="spinner" size="lg" text="加载中..." />
          </div>
        </Card>
      </section>

      <Divider variant="brush" />

      {/* 底部 */}
      <div className="text-center py-8">
        <p className="text-ink-light text-sm">
          水墨组件库 · 融合传统美学与现代交互
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Badge variant="subtle" size="sm">React</Badge>
          <Badge variant="subtle" size="sm">TypeScript</Badge>
          <Badge variant="subtle" size="sm">Tailwind CSS</Badge>
        </div>
      </div>
    </div>
  )
}

export default ComponentShowcase
