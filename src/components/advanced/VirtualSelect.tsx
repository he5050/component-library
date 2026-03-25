import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'

/**
 * 虚拟选择器组件
 *
 * 支持大数据量的下拉选择器，使用虚拟列表技术优化性能。
 * 当选项数量超过 100 条时自动启用虚拟化渲染。
 *
 * 水墨设计风格，支持搜索过滤、键盘导航。
 *
 * @example
 * ```tsx
 * const options = Array.from({ length: 10000 }, (_, i) => ({
 *   value: `option-${i}`,
 *   label: `选项 ${i}`
 * }))
 *
 * <VirtualSelect
 *   options={options}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   placeholder="请选择"
 *   searchable
 * />
 * ```
 */

export interface VirtualSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface VirtualSelectProps {
  /** 选项数组 */
  options: VirtualSelectOption[]
  /** 当前选中值 */
  value?: string
  /** 值变化回调 */
  onChange?: (value: string, option: VirtualSelectOption) => void
  /** 占位符文本 */
  placeholder?: string
  /** 标签文本 */
  label?: string
  /** 错误提示 */
  error?: string
  /** 禁用状态 */
  disabled?: boolean
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否可搜索 */
  searchable?: boolean
  /** 搜索占位符 */
  searchPlaceholder?: string
  /** 列表项高度 */
  itemHeight?: number
  /** 下拉列表最大高度 */
  maxHeight?: number
  /** 启用虚拟化的阈值（选项数量超过此值启用虚拟化） */
  virtualThreshold?: number
  /** 自定义类名 */
  className?: string
  /** 无匹配结果提示 */
  emptyText?: string
}

const sizeStyles = {
  sm: {
    trigger: 'h-8 px-3 text-sm rounded-[8px]',
    dropdown: 'max-h-[240px]',
    item: 'px-3 py-1.5 text-sm',
  },
  md: {
    trigger: 'h-10 px-4 text-sm rounded-[10px]',
    dropdown: 'max-h-[300px]',
    item: 'px-4 py-2 text-sm',
  },
  lg: {
    trigger: 'h-12 px-5 text-base rounded-[12px]',
    dropdown: 'max-h-[360px]',
    item: 'px-5 py-2.5 text-base',
  },
}

export function VirtualSelect({
  options,
  value,
  onChange,
  placeholder = '请选择',
  label,
  error,
  disabled = false,
  size = 'md',
  searchable = false,
  searchPlaceholder = '搜索...',
  itemHeight = 40,
  maxHeight,
  virtualThreshold = 100,
  className = '',
  emptyText = '无匹配结果',
}: VirtualSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // 过滤选项
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 是否启用虚拟化
  const shouldVirtualize = filteredOptions.length > virtualThreshold

  // 虚拟列表配置
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  })

  const selectedOption = options.find((opt) => opt.value === value)

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 打开时聚焦搜索框
  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 0)
    }
  }, [isOpen, searchable])

  // 重置高亮索引
  useEffect(() => {
    setHighlightedIndex(0)
    virtualizer.scrollToIndex(0)
  }, [searchQuery])

  const handleSelect = useCallback(
    (option: VirtualSelectOption) => {
      if (option.disabled) return
      onChange?.(option.value, option)
      setIsOpen(false)
      setSearchQuery('')
    },
    [onChange]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setIsOpen(true)
        }
        return
      }

      switch (event.key) {
        case 'Escape':
          setIsOpen(false)
          break
        case 'ArrowDown':
          event.preventDefault()
          setHighlightedIndex((prev) => {
            const next = Math.min(prev + 1, filteredOptions.length - 1)
            virtualizer.scrollToIndex(next)
            return next
          })
          break
        case 'ArrowUp':
          event.preventDefault()
          setHighlightedIndex((prev) => {
            const next = Math.max(prev - 1, 0)
            virtualizer.scrollToIndex(next)
            return next
          })
          break
        case 'Enter':
          event.preventDefault()
          if (filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex])
          }
          break
      }
    },
    [isOpen, filteredOptions, highlightedIndex, handleSelect, virtualizer]
  )

  const dropdownHeight = maxHeight || parseInt(sizeStyles[size].dropdown.replace('max-h-[', '').replace('px]', ''))

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* 标签 */}
      {label && (
        <label className="block text-sm text-ink-thick font-medium tracking-wide mb-1.5">
          {label}
        </label>
      )}

      {/* 触发器 */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          w-full flex items-center justify-between
          bg-paper-warm border font-body text-ink-deep
          transition-all duration-200 outline-none
          hover:bg-paper hover:border-ink/15
          focus:border-focus focus:shadow-ink-input-focus focus:bg-paper
          disabled:opacity-45 disabled:cursor-not-allowed
          ${error ? 'border-danger focus:border-danger' : 'border-ink/10'}
          ${sizeStyles[size].trigger}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={error ? true : undefined}
      >
        <span className={!selectedOption ? 'text-ink-light' : ''}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-ink-medium transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* 错误提示 */}
      {error && (
        <span className="text-xs text-danger flex items-center gap-1 mt-1" role="alert">
          ✕ {error}
        </span>
      )}

      {/* 下拉列表 */}
      {isOpen && (
        <div
          className="
            absolute z-50 w-full mt-1
            bg-paper border border-ink/10 rounded-lg shadow-ink-float
            overflow-hidden
          "
          style={{ maxHeight: dropdownHeight }}
          role="listbox"
        >
          {/* 搜索框 */}
          {searchable && (
            <div className="sticky top-0 bg-paper border-b border-ink/10 p-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="
                    w-full pl-9 pr-3 py-2
                    bg-paper-warm border border-ink/10 rounded-lg
                    text-sm text-ink-deep placeholder:text-ink-light
                    focus:outline-none focus:border-focus
                  "
                />
              </div>
            </div>
          )}

          {/* 选项列表 */}
          <div ref={listRef} className="overflow-auto" style={{ maxHeight: dropdownHeight - (searchable ? 60 : 0) }}>
            {filteredOptions.length === 0 ? (
              <div className="py-8 text-center text-sm text-ink-medium">{emptyText}</div>
            ) : shouldVirtualize ? (
              // 虚拟列表渲染
              <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const option = filteredOptions[virtualItem.index]
                  const isSelected = option.value === value
                  const isHighlighted = virtualItem.index === highlightedIndex

                  return (
                    <div
                      key={virtualItem.key}
                      data-index={virtualItem.index}
                      ref={virtualizer.measureElement}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <button
                        type="button"
                        disabled={option.disabled}
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => setHighlightedIndex(virtualItem.index)}
                        className={`
                          w-full text-left
                          ${sizeStyles[size].item}
                          transition-colors duration-150
                          ${isSelected ? 'bg-ink/10 text-ink-deep font-medium' : 'text-ink-thick'}
                          ${isHighlighted && !isSelected ? 'bg-ink/5' : ''}
                          ${option.disabled ? 'opacity-45 cursor-not-allowed' : 'hover:bg-ink/5 cursor-pointer'}
                        `}
                      >
                        {option.label}
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : (
              // 普通渲染（小数据量）
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value
                const isHighlighted = index === highlightedIndex

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`
                      w-full text-left
                      ${sizeStyles[size].item}
                      transition-colors duration-150
                      ${isSelected ? 'bg-ink/10 text-ink-deep font-medium' : 'text-ink-thick'}
                      ${isHighlighted && !isSelected ? 'bg-ink/5' : ''}
                      ${option.disabled ? 'opacity-45 cursor-not-allowed' : 'hover:bg-ink/5 cursor-pointer'}
                    `}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.label}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default VirtualSelect
