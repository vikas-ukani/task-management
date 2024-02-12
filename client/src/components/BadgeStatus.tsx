export default function BadgeStatus({ status }: { status: string }) {

    const statusBadge: any = {
        "To Do": <span className=" inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-md border-2 border-red-300 font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            {status}
        </span>,
        "In Progress": <span className=" inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-md border-2 border-red-300 font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {status}
        </span>,
        "Done": <span className=" inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-md border-2 border-red-300 font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {status}
        </span>,
    }

    return <>{statusBadge[status]}</>
}
