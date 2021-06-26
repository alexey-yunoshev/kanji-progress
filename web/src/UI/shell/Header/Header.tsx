import "./index.css"

import SignOutButton from "./SignOutButton/SignOutButton";
import React, {useEffect, useMemo, useState} from "react";
import {getAuth, User} from "firebase/auth";
import {Link as RouterLink, NavLink} from "react-router-dom";
import {useGetUser} from "../../../services/API";

interface MenuItem {
    name: string,
    pathname: string,
}

function Header() {
    const user = useGetUser()

    const menuItems: Array<MenuItem> = useMemo(() => [
        {
            pathname: "/search",
            name: "Search",
        },
        {
            pathname: "/kanji",
            name: "Kanji",
        }
    ], [])

    const displayName = user?.displayName;


    return (
        <div
            style={{
                height: "60px",
                position: "absolute",
                paddingLeft: "20px",
                paddingRight: "20px",
                width: "100vw"
            }}
            className="header"
        >
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        alignItems: "center",
                        display: "flex",
                        height: "100%",
                        maxWidth: "1000px",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            color: "var(--primary-text-color)",
                            fontSize: "1.8em",
                            fontWeight: 300,
                            minWidth: 200,
                        }}
                    >Kanji Progress
                    </div>
                    <nav
                        style={{
                            display: "flex",
                            gap: "30px",
                            margin: "0 2em",
                        }}
                    >
                        {
                            menuItems.map((item) => (
                                <NavLink
                                    exact={false}
                                    className="header-link"
                                    activeClassName="header-link--active"
                                    isActive={(_, location) => (
                                        location.pathname.startsWith(item.pathname)
                                    )}
                                    to={item.pathname}
                                    key={item.pathname}
                                >
                                    {item.name}
                                </NavLink>
                            ))
                        }
                    </nav>
                    <div
                        style={{
                            alignItems: "center",
                            display: "flex",
                            gap: "20px",
                            marginLeft: "auto",
                            padding: "10px 0",
                        }}
                    >
                        <div
                            style={{
                                color: "var(--primary-text-color)",
                            }}
                        >{displayName}</div>
                        <SignOutButton/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

