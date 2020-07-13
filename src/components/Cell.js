import React, { Component } from 'react'
import './Cell.css'

class BtnNumber extends Component {

    changeValue = (event) => {
        //Prevents user from entering a non-number
        if (!Number(event.target.value) && event.target.value !== "") return;

        //Changes the board value
        this.props.changeValue(this.props.i, this.props.j, Number(event.target.value));

    }

    render() {
        return (
            <div>
                {/* Renders the cell. Shows 0 as nothing */}
                <input className='component-btn-number' value={(this.props.value === 0) ? ' ' : this.props.value} onChange={event => this.changeValue(event)} />
            </div>
        )
    }
}

export default BtnNumber
