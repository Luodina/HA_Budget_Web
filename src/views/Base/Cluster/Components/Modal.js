/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Row, Col} from 'reactstrap';
import Select from 'react-select';

const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' }
  ];

class ModalAddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedOption: null,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(mode) {
      this.props.onExitModal(mode);
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    let {isOpen, dimensions} = this.props;
    console.log("isOpen", isOpen);
    const content = dimensions.map(item=>{
        console.log("item.headerName", item.headerName)
            return(
            <div>
                {item.headerName}
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                /> 
            </div>)
        });
    return (
      <div>
        <Modal isOpen={isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Dimensions</ModalHeader>
          <ModalBody>
            { dimensions &&
            <Row>
                <Col xs="12">
                {content}
                </Col>
                  
            </Row>}
           </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.toggle("add")}>Add</Button>
            <Button color="secondary" onClick={()=>this.toggle("cancel")}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalAddNew;