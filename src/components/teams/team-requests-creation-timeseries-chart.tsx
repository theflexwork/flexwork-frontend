"use client";

import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTicketCreationDaySeries } from "@/lib/actions/teams-request.action";
import { TicketActionCountByDateDTO } from "@/types/teams";

const TicketCreationByDaySeriesChart = ({
  teamId,
  days = 7,
}: {
  teamId: number;
  days: number;
}) => {
  const [data, setData] = useState<
    (TicketActionCountByDateDTO & { displayDay: string })[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getTicketCreationDaySeries(teamId, days);

      const formattedData = response.map((item, index) => ({
        ...item,
        displayDay: `Day ${index + 1}`, // Use "Day 1", "Day 2", etc., as the X-Axis label
      }));

      setData(formattedData);
    }
    fetchData();
  }, [teamId, days]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Ticket Trends (Created & Closed)</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="displayDay" // Use "Day 1", "Day 2", etc., for better readability
              tick={{ fontSize: 12 }} // Adjust tick size for clarity
            />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value}`,
                name === "createdCount" ? "Created Tickets" : "Closed Tickets",
              ]}
              labelFormatter={(label: string) => {
                const date = data.find((d) => d.displayDay === label)?.date;
                return <span>{date || "Unknown Date"}</span>;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="createdCount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Created Tickets"
            />
            <Line
              type="monotone"
              dataKey="closedCount"
              stroke="#82ca9d"
              name="Closed Tickets"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TicketCreationByDaySeriesChart;