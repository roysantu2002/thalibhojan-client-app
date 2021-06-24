/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';

class AddsModal extends Component {
    _isMounted = false;
    state = {
        open: false
    };

    componentDidMount(){
        this.setState({
            open: true
        });
    }

    closeModal = (e) => {
        this._isMounted = true;
        e.preventDefault();
        this.setState({
            open: false
        });
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        let { open } = this.state;
        return (
            <div className={`bts-popup ${open ? 'is-visible' : ''}`} role="alert">
                <div className="bts-popup-container">
                    <h3>Free Delivery</h3>
                    <form>
                        <input type="email" className="form-control" placeholder="mail@name.com" name="EMAIL" required={true} />
                    </form>

                    <ul>
                        <li>
                            <Link href="#">
                                <a className="facebook" target="_blank">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a className="twitter" target="_blank">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a className="linkdein" target="_blank">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a className="instagram" target="_blank">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </Link>
                        </li>
                    </ul>

                    <div className="img-box">
                        <img src="/images/menus/Chicken-pizza.png" alt="box" />
                        <img src="/images/menus/Chicken-pizza.png" alt="box" />
                    </div>

                    <Link href="#">
                        <a onClick={this.closeModal} className="bts-popup-close"></a>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AddsModal;
