import React from 'react'
import { Button, Form, Input, Modal } from 'semantic-ui-react'
const AddChannelModal = ({ show, onClose }) => {
  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input
              placeholder="Name"
              fluid
            />
          </Form.Field>
          <Form.Group>
            <Button fluid >Submit</Button>
            <Button fluid onClick={onClose} >Cancel</Button>
          </Form.Group>

        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default AddChannelModal