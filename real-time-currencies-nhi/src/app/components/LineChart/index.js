import { useState } from "react";
import Chart from "react-apexcharts";
// deleted : import {options} from "./options";

export const LineChart = (props) => {
    const {options} = props;

    return (
        <>
            <Chart
                type="line"
                options = {options.options}
                series = {options.series}
                height = "500"
                width = "1000"
            />
        </>
    )
}

export default LineChart;