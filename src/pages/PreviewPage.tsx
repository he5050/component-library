import { useEffect, useMemo, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { getPreviewEntry, listPreviewNames } from "../previewRegistry"
import Button from "../components/base/Button"
import Avatar from "../components/base/Avatar"
import Badge from "../components/base/Badge"
import Card from "../components/base/Card"
import Checkbox from "../components/base/Checkbox"
import Divider from "../components/base/Divider"
import Input from "../components/base/Input"
import Loading from "../components/base/Loading"
import Message from "../components/base/Message"
import Modal from "../components/base/Modal"
import Radio from "../components/base/Radio"
import Select from "../components/base/Select"
import Skeleton from "../components/base/Skeleton"
import Switch from "../components/base/Switch"
import Tabs from "../components/base/Tabs"
import Toast from "../components/base/Toast"
import Tooltip from "../components/base/Tooltip"

type PlaygroundControl = {
  key: string
  label: string
  type: "text" | "number" | "boolean" | "select"
  options?: Array<{ label: string; value: string }>
}

type PlaygroundConfig = {
  initialProps: Record<string, unknown>
  controls: PlaygroundControl[]
  render: (
    props: Record<string, unknown>,
    context: { onAction: (message: string) => void },
  ) => React.ReactNode
}

const cityOptions = [
  { value: "beijing", label: "北京" },
  { value: "shanghai", label: "上海" },
  { value: "guangzhou", label: "广州" },
]

interface ModalPlaygroundCaseProps {
  title: string
  content: string
  open: boolean
  showFooter: boolean
  onAction: (message: string) => void
}

function ModalPlaygroundCase({
  title,
  content,
  open,
  showFooter,
  onAction,
}: ModalPlaygroundCaseProps) {
  const [visible, setVisible] = useState(open)

  useEffect(() => {
    setVisible(open)
  }, [open])

  const closeModal = () => {
    setVisible(false)
    onAction("Modal 关闭")
  }

  return (
    <div className="w-full max-w-md">
      <Button
        variant="secondary"
        onClick={() => {
          setVisible(true)
          onAction("Modal 打开")
        }}>
        打开弹窗
      </Button>
      <Modal
        open={visible}
        onClose={closeModal}
        title={title}
        footer={
          showFooter ? (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  closeModal()
                  onAction("Modal 点击取消")
                }}>
                取消
              </Button>
              <Button
                onClick={() => {
                  closeModal()
                  onAction("Modal 点击确认")
                }}>
                确认
              </Button>
            </>
          ) : undefined
        }>
        <p className="text-ink-thick">{content}</p>
      </Modal>
    </div>
  )
}

const playgroundConfigs: Record<string, PlaygroundConfig> = {
  Avatar: {
    initialProps: { name: "张三", size: "md", src: "" },
    controls: [
      { key: "name", label: "name", type: "text" },
      { key: "src", label: "src", type: "text" },
      {
        key: "size",
        label: "size",
        type: "select",
        options: [
          { label: "sm", value: "sm" },
          { label: "md", value: "md" },
          { label: "lg", value: "lg" },
        ],
      },
    ],
    render: (props) => <Avatar name={String(props.name || "")} src={String(props.src || "") || undefined} size={(props.size as "sm" | "md" | "lg") || "md"} />,
  },
  Badge: {
    initialProps: { children: "标签", variant: "default" },
    controls: [
      { key: "children", label: "text", type: "text" },
      {
        key: "variant",
        label: "variant",
        type: "select",
        options: ["default", "primary", "success", "warning", "danger", "info"].map((value) => ({ label: value, value })),
      },
    ],
    render: (props) => <Badge variant={(props.variant as "default" | "primary" | "success" | "warning" | "danger" | "info") || "default"}>{String(props.children || "")}</Badge>,
  },
  Button: {
    initialProps: { children: "按钮", variant: "primary", size: "md", disabled: false },
    controls: [
      { key: "children", label: "text", type: "text" },
      { key: "disabled", label: "disabled", type: "boolean" },
      {
        key: "variant",
        label: "variant",
        type: "select",
        options: ["primary", "secondary", "outline", "ghost", "danger"].map((value) => ({ label: value, value })),
      },
      {
        key: "size",
        label: "size",
        type: "select",
        options: ["sm", "md", "lg"].map((value) => ({ label: value, value })),
      },
    ],
    render: (props) => (
      <Button
        variant={(props.variant as "primary" | "secondary" | "outline" | "ghost" | "danger") || "primary"}
        size={(props.size as "sm" | "md" | "lg") || "md"}
        disabled={Boolean(props.disabled)}>
        {String(props.children || "")}
      </Button>
    ),
  },
  Card: {
    initialProps: { variant: "default", hoverable: true, content: "卡片内容" },
    controls: [
      {
        key: "variant",
        label: "variant",
        type: "select",
        options: ["default", "ink", "featured"].map((value) => ({ label: value, value })),
      },
      { key: "hoverable", label: "hoverable", type: "boolean" },
      { key: "content", label: "content", type: "text" },
    ],
    render: (props) => (
      <Card variant={(props.variant as "default" | "ink" | "featured") || "default"} hoverable={Boolean(props.hoverable)} className="p-4 max-w-md">
        {String(props.content || "")}
      </Card>
    ),
  },
  Checkbox: {
    initialProps: { label: "同意协议", checked: false, disabled: false },
    controls: [
      { key: "label", label: "label", type: "text" },
      { key: "checked", label: "checked", type: "boolean" },
      { key: "disabled", label: "disabled", type: "boolean" },
    ],
    render: (props) => <Checkbox label={String(props.label || "")} checked={Boolean(props.checked)} disabled={Boolean(props.disabled)} onChange={() => {}} />,
  },
  Divider: {
    initialProps: { variant: "default" },
    controls: [
      {
        key: "variant",
        label: "variant",
        type: "select",
        options: ["default", "brush", "dashed", "gradient"].map((value) => ({ label: value, value })),
      },
    ],
    render: (props) => <Divider variant={(props.variant as "default" | "brush" | "dashed" | "gradient") || "default"} className="w-full" />,
  },
  Input: {
    initialProps: { label: "用户名", placeholder: "请输入", size: "md", disabled: false, error: "", hint: "" },
    controls: [
      { key: "label", label: "label", type: "text" },
      { key: "placeholder", label: "placeholder", type: "text" },
      { key: "error", label: "error", type: "text" },
      { key: "hint", label: "hint", type: "text" },
      { key: "disabled", label: "disabled", type: "boolean" },
      {
        key: "size",
        label: "size",
        type: "select",
        options: ["sm", "md", "lg"].map((value) => ({ label: value, value })),
      },
    ],
    render: (props) => (
      <div className="w-full max-w-md">
        <Input
          label={String(props.label || "") || undefined}
          placeholder={String(props.placeholder || "")}
          size={(props.size as "sm" | "md" | "lg") || "md"}
          disabled={Boolean(props.disabled)}
          error={String(props.error || "") || undefined}
          hint={String(props.hint || "") || undefined}
        />
      </div>
    ),
  },
  Loading: {
    initialProps: { size: "md", text: "加载中...", overlay: false },
    controls: [
      { key: "text", label: "text", type: "text" },
      { key: "overlay", label: "overlay", type: "boolean" },
      {
        key: "size",
        label: "size",
        type: "select",
        options: ["sm", "md", "lg"].map((value) => ({ label: value, value })),
      },
    ],
    render: (props) => <Loading size={(props.size as "sm" | "md" | "lg") || "md"} text={String(props.text || "") || undefined} overlay={Boolean(props.overlay)} />,
  },
  Message: {
    initialProps: { type: "info", title: "提示", children: "这是一条消息", closable: false },
    controls: [
      {
        key: "type",
        label: "type",
        type: "select",
        options: ["info", "success", "warning", "danger"].map((value) => ({ label: value, value })),
      },
      { key: "title", label: "title", type: "text" },
      { key: "children", label: "content", type: "text" },
      { key: "closable", label: "closable", type: "boolean" },
    ],
    render: (props) => (
      <div className="w-full max-w-lg">
        <Message type={(props.type as "info" | "success" | "warning" | "danger") || "info"} title={String(props.title || "") || undefined} closable={Boolean(props.closable)} onClose={() => {}}>
          {String(props.children || "")}
        </Message>
      </div>
    ),
  },
  Modal: {
    initialProps: { title: "提示", content: "这是一个可编辑的弹窗示例。", open: false, showFooter: true },
    controls: [
      { key: "title", label: "title", type: "text" },
      { key: "content", label: "content", type: "text" },
      { key: "open", label: "open", type: "boolean" },
      { key: "showFooter", label: "showFooter", type: "boolean" },
    ],
    render: (props, context) => (
      <ModalPlaygroundCase
        title={String(props.title || "")}
        content={String(props.content || "")}
        open={Boolean(props.open)}
        showFooter={Boolean(props.showFooter)}
        onAction={context.onAction}
      />
    ),
  },
  Radio: {
    initialProps: { label: "选项一", checked: true, disabled: false, name: "playground-radio" },
    controls: [
      { key: "label", label: "label", type: "text" },
      { key: "checked", label: "checked", type: "boolean" },
      { key: "disabled", label: "disabled", type: "boolean" },
      { key: "name", label: "name", type: "text" },
    ],
    render: (props) => (
      <Radio
        label={String(props.label || "")}
        checked={Boolean(props.checked)}
        disabled={Boolean(props.disabled)}
        name={String(props.name || "playground-radio")}
        onChange={() => {}}
      />
    ),
  },
  Select: {
    initialProps: { label: "城市", size: "md", disabled: false, error: "", value: "beijing" },
    controls: [
      { key: "label", label: "label", type: "text" },
      { key: "error", label: "error", type: "text" },
      { key: "disabled", label: "disabled", type: "boolean" },
      {
        key: "value",
        label: "value",
        type: "select",
        options: cityOptions.map((opt) => ({ label: opt.label, value: opt.value })),
      },
      {
        key: "size",
        label: "size",
        type: "select",
        options: ["sm", "md", "lg"].map((value) => ({ label: value, value })),
      },
    ],
    render: (props) => (
      <div className="w-full max-w-md">
        <Select
          label={String(props.label || "") || undefined}
          value={String(props.value || "beijing")}
          size={(props.size as "sm" | "md" | "lg") || "md"}
          disabled={Boolean(props.disabled)}
          error={String(props.error || "") || undefined}
          options={cityOptions}
          onChange={() => {}}
        />
      </div>
    ),
  },
  Skeleton: {
    initialProps: { variant: "text", width: 200, height: 16, rows: 1 },
    controls: [
      {
        key: "variant",
        label: "variant",
        type: "select",
        options: ["text", "circle", "rect"].map((value) => ({ label: value, value })),
      },
      { key: "width", label: "width", type: "number" },
      { key: "height", label: "height", type: "number" },
      { key: "rows", label: "rows", type: "number" },
    ],
    render: (props) => (
      <Skeleton
        variant={(props.variant as "text" | "circle" | "rect") || "text"}
        width={Number(props.width) || undefined}
        height={Number(props.height) || undefined}
        rows={Math.max(1, Number(props.rows) || 1)}
      />
    ),
  },
  Switch: {
    initialProps: { label: "开启开关", checked: true, disabled: false },
    controls: [
      { key: "label", label: "label", type: "text" },
      { key: "checked", label: "checked", type: "boolean" },
      { key: "disabled", label: "disabled", type: "boolean" },
    ],
    render: (props) => <Switch label={String(props.label || "")} checked={Boolean(props.checked)} disabled={Boolean(props.disabled)} onChange={() => {}} />,
  },
  Tabs: {
    initialProps: { variant: "basic", defaultActiveKey: "tab1" },
    controls: [
      {
        key: "variant",
        label: "variant",
        type: "select",
        options: [
          { label: "basic", value: "basic" },
          { label: "stats", value: "stats" },
        ],
      },
      { key: "defaultActiveKey", label: "defaultActiveKey", type: "text" },
    ],
    render: (props) => {
      const variant = String(props.variant || "basic")
      const basicTabs = [
        { key: "tab1", label: "标签一", content: <div className="p-3 bg-paper-warm rounded-lg">标签一内容</div> },
        { key: "tab2", label: "标签二", content: <div className="p-3 bg-paper-warm rounded-lg">标签二内容</div> },
        { key: "tab3", label: "标签三", content: <div className="p-3 bg-paper-warm rounded-lg">标签三内容</div> },
      ]
      const statsTabs = [
        { key: "overview", label: "概览", content: <div className="p-3 bg-paper-warm rounded-lg">统计概览内容</div> },
        { key: "detail", label: "详情", content: <div className="p-3 bg-paper-warm rounded-lg">统计详情内容</div> },
      ]
      const tabs = variant === "stats" ? statsTabs : basicTabs
      const defaultKey = String(props.defaultActiveKey || tabs[0].key)
      const fallbackKey = tabs.some((tab) => tab.key === defaultKey) ? defaultKey : tabs[0].key
      return <Tabs key={`${variant}-${fallbackKey}`} tabs={tabs} defaultActiveKey={fallbackKey} className="w-full max-w-lg" />
    },
  },
  Toast: {
    initialProps: { type: "info", message: "这是一条提示", duration: 0 },
    controls: [
      {
        key: "type",
        label: "type",
        type: "select",
        options: ["info", "success", "warning", "danger"].map((value) => ({ label: value, value })),
      },
      { key: "message", label: "message", type: "text" },
      { key: "duration", label: "duration", type: "number" },
    ],
    render: (props) => (
      <Toast
        type={(props.type as "info" | "success" | "warning" | "danger") || "info"}
        message={String(props.message || "")}
        duration={Math.max(0, Number(props.duration) || 0)}
        onClose={() => {}}
      />
    ),
  },
  Tooltip: {
    initialProps: { content: "提示内容", position: "top" },
    controls: [
      { key: "content", label: "content", type: "text" },
      {
        key: "position",
        label: "position",
        type: "select",
        options: ["top", "bottom", "left", "right"].map((value) => ({ label: value, value })),
      },
    ],
    render: (props) => (
      <Tooltip content={String(props.content || "")} position={(props.position as "top" | "bottom" | "left" | "right") || "top"}>
        <Button variant="secondary" size="sm">悬停查看</Button>
      </Tooltip>
    ),
  },
}

function parseQueryProps(searchParams: URLSearchParams): Record<string, unknown> {
  const props: Record<string, unknown> = {}
  searchParams.forEach((value, key) => {
    if (value === "true") props[key] = true
    else if (value === "false") props[key] = false
    else if (!isNaN(Number(value))) props[key] = Number(value)
    else props[key] = value
  })
  return props
}

function PreviewPage() {
  const { component } = useParams<{ component: string }>()
  const [searchParams] = useSearchParams()

  const entry = getPreviewEntry(component || "")
  const allNames = listPreviewNames()
  const queryProps = useMemo(() => parseQueryProps(searchParams), [searchParams])
  const playgroundConfig = component ? playgroundConfigs[component] : undefined
  const [playgroundProps, setPlaygroundProps] = useState<Record<string, unknown>>({})
  const [actionLogs, setActionLogs] = useState<string[]>([])

  useEffect(() => {
    if (!playgroundConfig) {
      setPlaygroundProps({})
      setActionLogs([])
      return
    }
    setPlaygroundProps({ ...playgroundConfig.initialProps, ...queryProps })
    setActionLogs([])
  }, [component, playgroundConfig, queryProps])

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center ink-card p-12 max-w-md">
          <div className="w-16 h-16 bg-paper-warm border border-ink/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-ink-medium" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-ink-deep mb-2">组件未找到</h1>
          <p className="text-ink-medium mb-6">组件 "{component}" 不存在</p>
          {allNames.length > 0 && (
            <div className="mb-6 text-left">
              <p className="text-xs text-ink-light mb-2 uppercase tracking-wider">可用组件：</p>
              <div className="flex flex-wrap gap-2">
                {allNames.map((name) => (
                  <Link
                    key={name}
                    to={`/preview/${name}`}
                    className="px-2.5 py-1 text-xs bg-paper-warm rounded-full border border-ink/10 hover:border-link hover:text-link transition-all text-ink-thick">
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <Link to="/">
              <Button variant="primary" size="md">
                <ArrowLeft className="w-4 h-4" />
                返回首页
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const Component = entry.component

  const pushAction = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("zh-CN", { hour12: false })
    setActionLogs((prev) => [`${timestamp} ${message}`, ...prev].slice(0, 10))
  }

  const handleControlChange = (control: PlaygroundControl, nextValue: string | number | boolean) => {
    setPlaygroundProps((prev) => ({ ...prev, [control.key]: nextValue }))
    pushAction(`修改 ${control.key} = ${String(nextValue)}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-paper to-paper-warm/40">
      <header className="py-4 px-6 bg-paper/85 backdrop-blur-sm border-b border-ink/8 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="link-ink inline-flex items-center gap-1.5 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <span className="text-ink-light text-sm px-2.5 py-1 rounded-full border border-ink/10 bg-paper-warm">
            {component} · {entry.kind === "demo" ? "示例" : "组件"}
          </span>
        </div>
      </header>

      <main className="flex-1 p-8">
        <div className="w-full max-w-5xl mx-auto ink-card p-6 md:p-10 space-y-10">
          <div className="mb-1 flex items-center justify-between border-b border-ink/8 pb-4">
            <h1 className="text-xl md:text-2xl font-display text-ink-deep">{component}</h1>
            <span className="text-xs text-ink-medium uppercase tracking-wider">Preview</span>
          </div>

          <section className="space-y-4">
            <div className="text-sm text-ink-medium">Demo 演示</div>
            <Component />
          </section>

          {playgroundConfig && (
            <section className="space-y-4 border-t border-ink/8 pt-6">
              <div className="text-sm text-ink-medium">Props Playground</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {playgroundConfig.controls.map((control) => (
                  <label key={control.key} className="flex flex-col gap-1.5">
                    <span className="text-xs text-ink-medium">{control.label}</span>
                    {control.type === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={Boolean(playgroundProps[control.key])}
                        onChange={(e) => handleControlChange(control, e.target.checked)}
                        className="h-4 w-4 accent-ink-deep"
                      />
                    ) : control.type === "select" ? (
                      <select
                        value={String(playgroundProps[control.key] ?? "")}
                        onChange={(e) => handleControlChange(control, e.target.value)}
                        className="h-9 px-3 rounded-lg bg-paper-warm border border-ink/10 text-sm">
                        {(control.options || []).map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={control.type === "number" ? "number" : "text"}
                        value={String(playgroundProps[control.key] ?? "")}
                        onChange={(e) =>
                          handleControlChange(
                            control,
                            control.type === "number" ? Number(e.target.value || 0) : e.target.value,
                          )
                        }
                        className="h-9 px-3 rounded-lg bg-paper-warm border border-ink/10 text-sm"
                      />
                    )}
                  </label>
                ))}
              </div>
              <div className="p-4 rounded-lg border border-ink/10 bg-paper-warm min-h-24 flex items-center justify-center">
                {playgroundConfig.render(playgroundProps, { onAction: pushAction })}
              </div>
              <div className="p-4 rounded-lg border border-ink/10 bg-paper">
                <div className="text-xs text-ink-medium mb-2">Interaction Log</div>
                {actionLogs.length === 0 ? (
                  <div className="text-xs text-ink-light">暂无交互记录</div>
                ) : (
                  <div className="space-y-1">
                    {actionLogs.map((line, index) => (
                      <div key={`${line}-${index}`} className="text-xs text-ink-thick font-mono">
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      <footer className="py-4 px-6 bg-paper/85 backdrop-blur-sm border-t border-ink/8">
        <div className="max-w-5xl mx-auto">
          <div className="text-sm text-ink-medium flex flex-wrap items-center gap-2">
            <span className="font-medium text-ink-thick">URL Props：</span>
            {Object.keys(queryProps).length > 0 ? (
              Object.entries(queryProps).map(([k, v]) => (
                <code key={k} className="text-xs px-2 py-0.5 rounded-full border border-ink/10 bg-paper-warm">
                  {k}="{String(v)}"
                </code>
              ))
            ) : (
              <span className="text-ink-light">无</span>
            )}
            <Link to="/" className="link-ink ml-auto inline-flex items-center gap-1">
              返回组件列表
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PreviewPage
