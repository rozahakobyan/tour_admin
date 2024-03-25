import React, {useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {GoSearch} from "react-icons/go";
import {CiSquareRemove} from "react-icons/ci";
import Logo from "./Logo";
import {scrollStatus} from "../../store/action/users";
import Profile from "./Profile";
import {useDispatch} from "react-redux";

const Header = () => {
    const [search, setSearch] = useState('');
    const [scrollDirection, setScrollDirection] = useState(null);
    const [settingModal, setSettingModal] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(scrollStatus(scrollDirection))
    }, [scrollDirection])

    useEffect(() => {
        let prevScrollPos = window.pageYOffset + 105;
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (prevScrollPos < currentScrollPos) {
                setScrollDirection(true);
            }
            if (prevScrollPos > currentScrollPos) {
                setScrollDirection(false);
            }
            prevScrollPos = Math.floor(currentScrollPos);
            if (prevScrollPos < 95) {
                setScrollDirection(null)
            }
            setSettingModal(null)
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [scrollDirection]);


    const handleChange = useCallback((event) => {
        const {value} = event.target
        setSearch(value)
    }, [])

    const handleSearch = useCallback(() => {

    }, [search])

    const handleRemoveSearch = useCallback(() => {
        setSearch('')
    }, [])

    return (
        <header className={classNames('header')}>
            <nav className={classNames('nav', {
                activeScroll: scrollDirection,
                isActiveScroll: scrollDirection === false
            })}>
                <Logo/>
                <form
                    onSubmit={handleSearch}
                    className={'search'}>
                    <div className={'input-search'}>
                        <input
                            onChange={handleChange}
                            value={search}
                            placeholder={'Search...'}
                            type={'text'}
                        />
                        {
                            search.length >= 3 ? <small
                                onClick={handleRemoveSearch}
                                className={'remove-text'}>
                                <CiSquareRemove/></small> : null
                        }
                    </div>
                    <button>
                        <span> <GoSearch/></span>
                    </button>
                </form>
                <Profile
                    setSettingModal={setSettingModal}
                    settingModal={settingModal}
                    scrollDirection={scrollDirection}
                />
            </nav>
        </header>
    );
};

export default Header;
