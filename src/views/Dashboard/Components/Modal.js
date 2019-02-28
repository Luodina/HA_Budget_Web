/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Row, Col} from 'reactstrap';
import Select from 'react-select';

class ModalAddNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedOption: {},
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle(mode) {
    //console.log(`=======>:`, this.state.selectedOption);
    this.props.onExitModal(mode,this.state.selectedOption);
  }

  handleChange = (selectedOption) => {
    console.log(`Option selected1:`, selectedOption);
    let tmpSelected = this.state.selectedOption;
  
    tmpSelected[selectedOption.dim]=selectedOption.value;
    console.log(`Option selected2:`, tmpSelected);
    this.setState({ tmpSelected });
    console.log(`Option selected3:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    let {isOpen, dimensions, data} = this.props;
    console.log("data", data);
    const content = dimensions.map((item,i)=>{
        console.log("item.field", item.field)
        let options =  data[item.field];
          return(
          <div key ={i}>
              {item.headerName}
              <Select
                  value={selectedOption.xxx}
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