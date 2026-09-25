import TalosIcon from './TalosIcon';

export default function InfoTip({
  label = 'Mais informações',
  title = '',
  children,
  align = 'center',
  className = '',
}) {
  return (
    <span className={`info-tip info-tip-${align} ${className}`.trim()}>
      <button type="button" className="info-tip-trigger" aria-label={label} onClick={event => event.stopPropagation()}>
        <TalosIcon name="info" size={12} strokeWidth={1.9} />
      </button>
      <span className="info-tip-popover" role="tooltip">
        {title && <strong className="info-tip-title">{title}</strong>}
        <span className="info-tip-copy">{children}</span>
      </span>
    </span>
  );
}
