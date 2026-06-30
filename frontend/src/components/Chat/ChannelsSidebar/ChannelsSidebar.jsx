import { Offcanvas, Button } from 'react-bootstrap'

const ChannelsSidebar = ({ show, onHide, title, children }) => {
  return (
    <div className="d-flex">
      <Offcanvas show={show} onHide={onHide} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column p-0">
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default ChannelsSidebar
