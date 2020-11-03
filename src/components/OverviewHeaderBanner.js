import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@material-ui/core"
import { Settings, ExitToAppRounded } from '@material-ui/icons';

import logoRegion from "../assets/logo_region.png"

const OverviewHeaderBanner = ({healthCenter}) => {
   
    const { logout } = useAuth0();


    return (
        <>
            <div className="p-2 h-32 flex">
                <div className="w-1/5 self-center">
                    <img src={logoRegion} alt="regional logo" />
                </div>  
            
                <div className="w-3/5 text-center text-gray-900 self-center">
                    <Link 
                        className="w-4/5 text-center text-gray-900" 
                        href="/overview/home" 
                        variant="h2" 
                        underline="none" 
                        noWrap
                        style={{ color: "#000", textDecoration: "none" }}
                    >
                        { healthCenter }
                    </Link>
                </div>
                <div className="w-1/5 flex self-center justify-end">
                    <Link className="text-gray-800 mr-4" href="/overview/settings">
                        <Settings style={{ color: "#828282", fontSize: 50 }} />
                    </Link>
                    <Link 
                        className="text-gray-800 mr-4" 
                        onClick={() =>
                            logout({
                            returnTo: "http://localhost:3000",
                            })
                        }
                        style={{ cursor: "pointer" }}

                    >
                        <ExitToAppRounded style={{ color: "#828282", fontSize: 50 }} />
                    </Link>
                </div>  
            </div>
        </>
    );
};

export default OverviewHeaderBanner;