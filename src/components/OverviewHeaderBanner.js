import React from "react";

import { Link } from "@material-ui/core"
import { Help, Settings, ExitToAppRounded } from '@material-ui/icons';

const OverviewHeaderBanner = ({healthCenter}) => {
   
    return (
        <>
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
        </>
    );
};

export default OverviewHeaderBanner;