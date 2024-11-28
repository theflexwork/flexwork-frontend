"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTicketsAssignmentDistribution } from "@/lib/actions/teams-request.action";
import { obfuscate } from "@/lib/endecode";
import { TicketDistributionDTO } from "@/types/team-requests";

interface TicketDistributionChartProps {
  teamId: number; // The ID of the team to fetch data for
}

// Colors for the bar chart
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#d0ed57"];

const TicketDistributionChart: React.FC<TicketDistributionChartProps> = ({
  teamId,
}) => {
  const [data, setData] = useState<TicketDistributionDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getTicketsAssignmentDistribution(teamId);
        setData(response);
      } catch (err) {
        setError("Failed to load ticket distribution data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  // Map data for the chart (replace null userName with "Unassigned")
  const chartData = data.map((item) => ({
    name: item.userName || "Unassigned",
    value: item.ticketCount,
    userId: item.userId,
  }));

  // Custom Y-Axis Tick Component
  const CustomYAxisTick = ({
    x,
    y,
    payload,
  }: {
    x: number;
    y: number;
    payload: { value: string };
  }) => {
    const user = chartData.find((item) => item.name === payload.value);

    return (
      <text
        x={x - 10}
        y={y}
        dy={4}
        textAnchor="end"
        fill="currentColor"
        style={{ color: "inherit" }}
      >
        {user?.userId ? (
          <Link
            href={`/portal/users/${obfuscate(user.userId)}`}
            key={user.userId}
            style={{
              textDecoration: "underline",
              color: "inherit",
            }}
          >
            {payload.value}
          </Link>
        ) : (
          <tspan>{payload.value}</tspan>
        )}
      </text>
    );
  };

  return (
    <Card className="w-full max-w-[800px] mx-auto">
      <CardHeader>
        <CardTitle>Ticket Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {loading && (
          <p className="text-center">Loading ticket distribution...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && chartData.length === 0 && (
          <p className="text-center">No ticket distribution data available.</p>
        )}

        {!loading && !error && chartData.length > 0 && (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={(props) => <CustomYAxisTick {...props} />}
                  width={150}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={COLORS[0]} name="Ticket Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketDistributionChart;