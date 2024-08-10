import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'

export default function InfoTooltip({
  children,
  content,
  variant = 'info',
  maxWidth = 'xs',
}) {
  const triggerStyles =
    variant === 'source'
      ? 'cursor-pointer whitespace-nowrap'
      : 'cursor-pointer whitespace-nowrap underline decoration-dotted'

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className={triggerStyles}>
            {children}
            <sup className="text-teal-500">
              {variant === 'source' ? '[?]' : '?'}
            </sup>
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={clsx(
              'rounded bg-white/90 bg-zinc-800/90 px-3 py-2 text-sm font-medium text-zinc-800 text-zinc-200 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 ring-white/10 backdrop-blur',
              `max-w-${maxWidth}`
            )}
            sideOffset={5}
          >
            {content}
            {/* <Tooltip.Arrow className="TooltipArrow" /> */}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
