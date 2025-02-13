"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useStorageUrl } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"

function EventCard({ eventId }: { eventId: Id<"events"> }) {
    const { user } = useUser()
    const router = useRouter()
    const event = useQuery(api.events.getById, { eventId })
    const availability = useQuery(api.events.getEventAvailability, { eventId })

    const userTicket = useQuery(api.tickets.getUserTicketForEvent, { eventId, userId: user?.id ?? "" })

    const queuePosition = useQuery(api.waitingList.getQueuePosition, { eventId, userId: user?.id ?? "" })

    const imageUrl = useStorageUrl(event?.imageStorageId)

    if (!event || !availability) {
        return null
    }

    const isPastEvent = event.eventDate < Date.now()

    const isEventOwner = user?.id === event?.userId

    return (
        <div
            onClick={() => router.push(`/event/${eventId}`)}
            
        >

        </div>
    )
}

export default EventCard