import { useState, useMemo } from 'react'
import { VirtualSelect } from '../../components/advanced/VirtualSelect'

/**
 * 虚拟选择器演示组件
 *
 * 展示 VirtualSelect 组件的各种使用场景，
 * 包括大数据量选择、搜索过滤、不同尺寸等。
 */

// 生成模拟选项数据
function generateOptions(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    value: `option-${i}`,
    label: `选项 ${i + 1} - ${['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'][i % 8]}`,
  }))
}

// 生成带禁用状态的选项
function generateOptionsWithDisabled(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    value: `option-${i}`,
    label: `选项 ${i + 1}`,
    disabled: i % 10 === 0, // 每 10 个禁用 1 个
  }))
}

function VirtualSelectDemo() {
  const [basicValue, setBasicValue] = useState('')
  const [searchableValue, setSearchableValue] = useState('')
  const [largeValue, setLargeValue] = useState('')
  const [sizeValue, setSizeValue] = useState('')
  const [errorValue, setErrorValue] = useState('')
  const [mediumValue, setMediumValue] = useState('')

  // 生成不同规模的数据
  const smallOptions = useMemo(() => generateOptions(50), [])
  const mediumOptions = useMemo(() => generateOptions(500), [])
  const largeOptions = useMemo(() => generateOptions(10000), [])
  const disabledOptions = useMemo(() => generateOptionsWithDisabled(100), [])

  return (
    <div className="p-6 space-y-8">
      {/* 标题 */}
      <div className="border-b border-ink/10 pb-4">
        <h2 className="text-xl font-semibold text-ink-deep">虚拟选择器组件演示</h2>
        <p className="text-sm text-ink-medium mt-1">
          支持大数据量的下拉选择器，自动启用虚拟化渲染
        </p>
      </div>

      {/* 基础用法 - 小数据量 */}
      <section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-ink-deep">基础用法（小数据量）</h3>
          <span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">50 条</span>
        </div>
        <p className="text-sm text-ink-medium mb-5">
          数据量小于 100 条时，使用普通渲染模式
        </p>
        <div className="max-w-sm">
          <VirtualSelect
            label="选择城市"
            options={smallOptions}
            value={basicValue}
            onChange={(value) => setBasicValue(value)}
            placeholder="请选择城市"
          />
        </div>
        {basicValue && (
          <div className="mt-4 p-3 bg-ink/5 rounded-lg">
            <span className="text-sm text-ink-medium">已选择：</span>
            <span className="text-sm text-ink-deep font-medium">{basicValue}</span>
          </div>
        )}
      </section>

      {/* 中等数据量 */}
      <section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-ink-deep">中等数据量</h3>
          <span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">500 条</span>
        </div>
        <p className="text-sm text-ink-medium mb-5">
          数据量超过 100 条，自动启用虚拟化渲染
        </p>
        <div className="max-w-sm">
          <VirtualSelect
            label="选择选项"
            options={mediumOptions}
            value={mediumValue}
            onChange={(value) => setMediumValue(value)}
            placeholder="请选择一个选项"
          />
        </div>
      </section>

      {/* 大数据量 + 搜索 */}
      <section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-ink-deep">大数据量 + 搜索</h3>
          <span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">10,000 条</span>
        </div>
        <p className="text-sm text-ink-medium mb-5">
          支持 10,000+ 数据量，配合搜索功能快速定位
        </p>
        <div className="max-w-sm">
          <VirtualSelect
            label="搜索选择"
            options={largeOptions}
            value={searchableValue}
            onChange={(value) => setSearchableValue(value)}
            placeholder="输入关键词搜索..."
            searchable
            searchPlaceholder="搜索选项..."
          />
        </div>
      </section>

      {/* 不同尺寸 */}
      <section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-ink-deep">不同尺寸</h3>
          <span className="text-xs text-ink-light px-2 py-0.5 bg-paper rounded-full">3种</span>
        </div>
        <p className="text-sm text-ink-medium mb-5">
          支持 sm、md、lg 三种尺寸
        </p>
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
            <VirtualSelect
              size="sm"
              options={smallOptions}
              value={sizeValue}
              onChange={(value) => setSizeValue(value)}
              placeholder="小尺寸"
              className="flex-1"
            />
            <span className="text-xs text-ink-light w-8">sm</span>
          </div>
          <div className="flex items-center gap-3">
            <VirtualSelect
              size="md"
              options={smallOptions}
              value={sizeValue}
              onChange={(value) => setSizeValue(value)}
              placeholder="中尺寸"
              className="flex-1"
            />
            <span className="text-xs text-ink-light w-8">md</span>
          </div>
          <div className="flex items-center gap-3">
            <VirtualSelect
              size="lg"
              options={smallOptions}
              value={sizeValue}
              onChange={(value) => setSizeValue(value)}
              placeholder="大尺寸"
              className="flex-1"
            />
            <span className="text-xs text-ink-light w-8">lg</span>
          </div>
        </div>
      </section>

      {/* 禁用状态 */}
      <section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-ink-deep">禁用状态</h3>
        </div>
        <p className="text-sm text-ink-medium mb-5">
          支持整体禁用和部分选项禁用
        </p>
        <div className="space-y-4 max-w-sm">
          <VirtualSelect
            label="整体禁用"
            options={smallOptions}
            value=""
            placeholder="禁用状态"
            disabled
          />
          <VirtualSelect
            label="部分选项禁用（每10个禁用1个）"
            options={disabledOptions}
            value={largeValue}
            onChange={(value) => setLargeValue(value)}
            placeholder="请选择"
          />
        </div>
      </section>

      {/* 错误状态 */}
      <section className="p-6 bg-paper-warm/30 rounded-xl border border-ink/8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-semibold text-ink-deep">错误状态</h3>
        </div>
        <p className="text-sm text-ink-medium mb-5">
          支持错误提示和验证状态
        </p>
        <div className="max-w-sm">
          <VirtualSelect
            label="必填项"
            options={smallOptions}
            value={errorValue}
            onChange={(value) => setErrorValue(value)}
            placeholder="请选择"
            error={!errorValue ? '请选择一个选项' : undefined}
          />
        </div>
      </section>

      {/* 性能说明 */}
      <div className="bg-focus/10 border border-focus/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-focus-dark mb-2">💡 性能说明</h4>
        <ul className="text-sm text-ink-medium space-y-1 list-disc list-inside">
          <li>数据量小于 100 条时，使用普通渲染模式，保证交互流畅</li>
          <li>数据量超过 100 条时，自动启用虚拟化渲染，只渲染可视区域选项</li>
          <li>支持 10,000+ 数据量，滚动流畅无卡顿</li>
          <li>搜索功能使用防抖处理，避免频繁过滤计算</li>
          <li>键盘导航支持：↑↓ 移动选中项，Enter 确认选择，Esc 关闭下拉</li>
        </ul>
      </div>
    </div>
  )
}

export default VirtualSelectDemo
