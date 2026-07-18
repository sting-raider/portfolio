import { tickerItems } from '../data/projects'

export function Ticker() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="ticker" aria-label="Live telemetry ticker">
      <div className="ticker-track">
        {items.map((item, i) => {
          const [head, ...rest] = item.split(' ▲ ')
          return (
            <span className="ticker-item" key={i} aria-hidden={i >= tickerItems.length}>
              <b>{head}</b> {rest.join(' ▲ ')}
            </span>
          )
        })}
      </div>
    </div>
  )
}
