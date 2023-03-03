
interface MenuProp {
  x: number,
  y: number
}

export default function Menu({x, y}:MenuProp){
  return(
    <div
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: '100px',
        height: '100px',
        borderStyle: 'solid',
      }}
    >
      drop-down menu
    </div>
  )
}