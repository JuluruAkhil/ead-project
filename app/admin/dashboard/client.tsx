"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, Colors)

export default function Client({ salesRepDataAndPendingOrders, managerData }) {
  // generate data from salesRepDataAndPendingOrders

  function transformStudentData(userData) {
    const labels = []
    const data = []

    userData.forEach((user) => {
      labels.push(user.email)
      data.push(user.numberOfPendingOrders)
    })

    const transformedData = {
      labels: labels,
      datasets: [
        {
          label: "# of Pending Orders by Sales Rep",
          data: data,
        },
      ],
    }

    return transformedData
  }

  function transformManagerData(managerData) {
    const labels = []
    const data = []

    managerData.forEach((manager) => {
      labels.push(manager.managerEmail)
      data.push(manager.totalPendingOrders)
    })

    const transformedData = {
      labels: labels,
      datasets: [
        {
          label: "# of Pending Orders by Manager",
          data: data,
        },
      ],
    }

    return transformedData
  }

  const chartStudentData = transformStudentData(salesRepDataAndPendingOrders)
  const chartManagerData = transformManagerData(managerData)
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle>Sales Rep Dashboard</CardTitle>
            {/* <Link href="/order/new">
              <Button
                className="w-8 h-8 rounded-full"
                size="icon"
                variant="outline"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">New order</span>
              </Button>
            </Link> */}
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-screen flex justify-center items-center gap-4">
              <div className="text-center w-full h-full">
                <CardTitle># of Pending Orders by Sales Rep</CardTitle>
                <Doughnut data={chartStudentData} />
              </div>
              <div className="text-center w-full h-full">
                <CardTitle># of Pending Orders by Manager</CardTitle>
                <Doughnut data={chartManagerData} />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
