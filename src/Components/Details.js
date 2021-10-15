import { Modal, Button } from 'react-bootstrap';

function Details(props) {
    if (!props.show) return (
        <div></div>
    )
    const info = props.info;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {info.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <b>Owner:</b> {info.owner.login}
          </p>
          <p>
            <b>Description:</b>{info.description}
          </p>
          <p>
            <b>Language:</b> {info.language}
          </p>
          <p>
            <b>Stars:</b> {info.stargazers_count}
          </p>
          <p>
            <b>Watchers:</b> {info.watchers_count}
          </p>
          <p>
            <b>Forks:</b> {info.forks_count}
          </p>
          <p>
            <b>Created:</b> {info.created_at}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  export default Details;