export const Rook = ({ color = '#000000', stroke = '#ffffff', id, className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id={id} className={className} version="1.1" width="45" height="45">
      <g fill={color} stroke={color} style={{
        opacity: '1',
        'fillRule': 'evenodd',
        'fillOpacity': '1',
        'strokeWidth': '1.5',
        'strokeLinecap': 'round',
        'strokeLinejoin': 'round',
        'strokeMiterlimit': '4',
        'strokeDasharray': 'none',
        'strokeOpacity': '1',
      }}>
        <path
          d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
          style={{ 'strokeLinecap':'butt' }} />
        <path
          d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
          style={{ 'strokeLinecap':'butt' }} />
        <path
          d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
          style={{ 'strokeLinecap':'butt' }} />
        <path
          d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
          style={{ 'strokeLinecap':'butt', 'strokeLinejoin':'miter' }} />
        <path
          d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
          style={{ 'strokeLinecap':'butt' }} />
        <path
          d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
          style={{ 'strokeLinecap':'butt' }} />
        <path
          d="M 12,35.5 L 33,35.5 L 33,35.5"
          stroke={stroke} style={{
          fill: 'none',
          'strokeWidth': '1',
          'strokeLinejoin': 'miter',
        }} />
        <path
          d="M 13,31.5 L 32,31.5"
          stroke={stroke} style={{
          fill: 'none',
          'strokeWidth': '1',
          'strokeLinejoin': 'miter',
        }} />
        <path
          d="M 14,29.5 L 31,29.5"
          stroke={stroke} style={{
          fill: 'none',
          'strokeWidth': '1',
          'strokeLinejoin': 'miter',
        }} />
        <path
          d="M 14,16.5 L 31,16.5"
          stroke={stroke} style={{
          fill: 'none',
          'strokeWidth': '1',
          'strokeLinejoin': 'miter',
        }} />
        <path
          d="M 11,14 L 34,14"
          stroke={stroke} style={{
          fill: 'none',
          'strokeWidth': '1',
          'strokeLinejoin': 'miter',
        }} />
      </g>
    </svg>
  )
}