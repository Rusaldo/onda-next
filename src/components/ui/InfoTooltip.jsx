import * as Tooltip from '@radix-ui/react-tooltip'

export default function InfoTooltip({ children, content }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-pointer whitespace-nowrap underline decoration-dotted">
            {children}
            <sup className="text-teal-500">?</sup>
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-xs rounded bg-white/90 bg-zinc-800/90 px-3 py-2 text-sm font-medium text-zinc-800 text-zinc-200 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 ring-white/10 backdrop-blur"
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
