import React, { useState } from "react";

import { Breadcrumbs, Link, Divider, AppBar, Toolbar, InputBase } from "@material-ui/core"
import { Help, Settings, ExitToAppRounded, Search } from '@material-ui/icons';

import { NavTabs } from "../components";

// TODO:
// Routing is incomplete, styling is whatever


const OverviewHeader = () => {

    // will change later on
    const healthCenter = useState("X_Vårdcentral")

    return (
    <>
        <div className="w-full h-auto">
            <div className="p-2 h-auto">
                <Breadcrumbs className="self-center" separator=">" aria-label="breadcrumb">
                    <Link className="text-gray-800" href="/overview">
                        { healthCenter }
                    </Link>
                    <Link className="text-gray-800" href="/overview/home" >
                        Hem
                    </Link>
                </Breadcrumbs>
            </div>

            <Divider variant="middle"/>

            <div className="p-2 h-32 flex">
                <div className="w-4/5 text-center text-gray-900 self-center">
                    <Link className="w-4/5 text-center text-gray-900" href="/overview/home" variant="h2" noWrap>
                        { healthCenter }
                    </Link>
                </div>
                <div className="w-1/5 flex self-center">
                    <Link className="w-1/3 text-gray-800 text-center">
                        <Help style={{ fontSize: 40 }} />
                    </Link>
                    <Link className="w-1/3 text-gray-800 text-center" href="/overview/settings">
                        <Settings style={{ fontSize: 40 }} />
                    </Link>
                    <Link className="w-1/3 text-gray-800 text-center" href="/logout">
                        <ExitToAppRounded style={{ fontSize: 40 }} />
                    </Link>
                </div>  
            </div>

            <Divider variant="middle"/>

            <div className="p-2 h-auto">
                <AppBar className="bg-transparent shadow-none" position="relative">
                    <Toolbar>
                        <Link className="w-1/5 text-center text-gray-800" href="/overview/home" variant="h6" noWrap>
                            Hem
                        </Link>
                        <Link className="w-1/5 text-center text-gray-800" href="/overview/patients" variant="h6" noWrap>
                            Patienter
                        </Link>
                        <Link className="w-1/5 text-center text-gray-800" href="/overview/calendar" variant="h6" noWrap>
                            Kalender
                        </Link>
                        <Link className="w-1/5 text-center text-gray-800" href="/overview/notices" variant="h6" noWrap>
                            Notislogg
                        </Link>
                        <div className="w-1/5 text-center">
                            <Search className="mr-2 text-gray-800"/>
                            <InputBase
                                className="text-gray-800"
                                placeholder="Sök..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </div>
        
        <Divider variant="middle"/>

        <NavTabs />


    </>
    );
};

export default OverviewHeader;