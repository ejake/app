import React, {useEffect, useState} from "react"

import {Code} from "./code"
import {Footer} from './footer'
import {LabLoader} from "./loader";
import CACHE from "../cache/cache";
import {RunListItemModel} from "../models/run";
import {RunsList} from "./runs_list";

import "./empty_runs_list.scss"

export function EmptyRunsList() {
    const [runs, setRuns] = useState<RunListItemModel[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const samples_token: string = process.env.REACT_APP_SAMPLES_PROJECT_TOKEN !

        const runListCache = CACHE.getRunsList()

        async function load() {
            let currentRunsList = await runListCache.getRunsList(samples_token)
            if (currentRunsList) {
                setRuns(currentRunsList.runs)
                setIsLoading(false)
            }
        }

        load().then()
    }, [])


    return <div>
        <div className={'text-center'}>
            <h5 className={'mt-4 px-1'}>You will see your experiments here</h5>
            <p className={'px-1'}>Start monitoring your models by adding just two lines of
                code:</p>
        </div>
        <Code/>
        <div className={'text-center my-4'}>
            <h5 className={'title'}>Sample experiments</h5>
        </div>
        {isLoading ? <LabLoader/> : <RunsList runs={runs}/>}
        <div className={'mt-5'}>
            <Footer/>
        </div>
    </div>
}


