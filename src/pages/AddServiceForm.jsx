"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Camera } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Switch } from "../components/ui/switch"
import { Skeleton } from "../components/ui/skeleton"

export default function AddServiceForm() {
    const [serviceName, setServiceName] = useState("Premium Haircut")
    const [description, setDescription] = useState(
        "A high-quality haircut service with a professional stylist. Includes wash, cut, and style.",
    )
    const [color, setColor] = useState("#8B5CF6") // Default purple color
    const [price, setPrice] = useState("75.00")
    const [currency, setCurrency] = useState("USD")
    const [paymentMethod, setPaymentMethod] = useState("online-in-person")
    const [duration, setDuration] = useState("1-hour")
    const [capacity, setCapacity] = useState("1")
    const [isServiceAvailable, setIsServiceAvailable] = useState(true)
    const [isRecurringService, setIsRecurringService] = useState(false)
    const [visibility, setVisibility] = useState("visible")
    const [isLoading, setIsLoading] = useState(true)

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000) // Simulate 2 seconds of loading
        return () => clearTimeout(timer)
    }, [])

    const handleSave = () => {
        const formData = {
            serviceName,
            description,
            color,
            price,
            currency,
            paymentMethod,
            duration,
            capacity,
            isServiceAvailable,
            isRecurringService,
            visibility,
        }
        console.log("Saving service:", formData)
        // In a real application, you would send this data to a backend API
        alert("Service data saved! Check console for details.")
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="flex items-center justify-between p-4 bg-white border-b">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="text-xl font-semibold">Add Service</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Preview</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </header>
            <main className="flex-1 p-6 grid md:grid-cols-[1fr_300px] gap-6">
                {isLoading ? (
                    <>
                        {/* Left Column Skeletons */}
                        <div className="grid gap-6">
                            {/* Service Info Skeleton */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-32" />
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-20 w-full" />
                                    <Skeleton className="h-4 w-16" />
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Price & Payments Skeleton */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-40" />
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Duration & Capacity Skeleton */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-48" />
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Scheduling Options Skeleton */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-48" />
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="grid gap-1">
                                            <Skeleton className="h-4 w-64" />
                                            <Skeleton className="h-3 w-48" />
                                        </div>
                                        <Skeleton className="h-6 w-10 rounded-full" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="grid gap-1">
                                            <Skeleton className="h-4 w-64" />
                                            <Skeleton className="h-3 w-48" />
                                        </div>
                                        <Skeleton className="h-6 w-10 rounded-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column Skeletons */}
                        <div className="grid gap-6">
                            {/* Visibility Skeleton */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-24" />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="flex items-start gap-2">
                                            <Skeleton className="h-5 w-5 rounded-full" />
                                            <div className="grid gap-1">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-3 w-48" />
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Skeleton className="h-5 w-5 rounded-full" />
                                            <div className="grid gap-1">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-3 w-48" />
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Skeleton className="h-5 w-5 rounded-full" />
                                            <div className="grid gap-1">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-3 w-48" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Photos Skeleton */}
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-20" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-[180px] w-full rounded-lg" />
                                </CardContent>
                            </Card>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Left Column Original form content */}
                        <div className="grid gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Service Info</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="service-name">Service Name</Label>
                                        <Input
                                            id="service-name"
                                            placeholder="Premium Haircut"
                                            value={serviceName}
                                            onChange={(e) => setServiceName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="A high-quality haircut service with a professional stylist. Includes wash, cut, and style."
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="color">Color</Label>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 rounded-md border"
                                                style={{ backgroundColor: color }}
                                                onClick={() => {
                                                    const newColor = prompt("Enter a hex color (e.g., #FF0000):", color)
                                                    if (newColor) setColor(newColor)
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                aria-label="Choose color"
                                            />
                                            <span className="text-sm text-gray-500">Choose a color to display on your calendar.</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Price & Payments</CardTitle>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="75.00"
                                                className="pl-7"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="payment-method">Payment method</Label>
                                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                            <SelectTrigger id="payment-method">
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="online-in-person">Online and in-person</SelectItem>
                                                <SelectItem value="online-only">Online only</SelectItem>
                                                <SelectItem value="in-person-only">In-person only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Duration & Capacity</CardTitle>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="duration">Duration</Label>
                                        <Select value={duration} onValueChange={setDuration}>
                                            <SelectTrigger id="duration">
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="30-min">30 minutes</SelectItem>
                                                <SelectItem value="1-hour">1 hour</SelectItem>
                                                <SelectItem value="1.5-hour">1 hour 30 minutes</SelectItem>
                                                <SelectItem value="2-hour">2 hours</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="capacity">Capacity</Label>
                                        <Input
                                            id="capacity"
                                            type="number"
                                            placeholder="1"
                                            min="1"
                                            value={capacity}
                                            onChange={(e) => setCapacity(e.target.value)}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Scheduling Options</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="grid gap-1">
                                            <Label htmlFor="service-available">Make service available for booking</Label>
                                            <CardDescription>Clients can see this service and book it.</CardDescription>
                                        </div>
                                        <Switch
                                            id="service-available"
                                            checked={isServiceAvailable}
                                            onCheckedChange={setIsServiceAvailable}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="grid gap-1">
                                            <Label htmlFor="recurring-service">Set as a recurring service</Label>
                                            <CardDescription>Set a schedule for repeating appointments.</CardDescription>
                                        </div>
                                        <Switch
                                            id="recurring-service"
                                            checked={isRecurringService}
                                            onCheckedChange={setIsRecurringService}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column Original form content */}
                        <div className="grid gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Visibility</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup value={visibility} onValueChange={setVisibility} className="grid gap-4">
                                        <div className="flex items-start gap-2">
                                            <RadioGroupItem id="visible" value="visible" />
                                            <Label htmlFor="visible" className="grid gap-1 cursor-pointer">
                                                Visible
                                                <span className="text-sm font-normal text-gray-500">
                          Service is visible on your booking page.
                        </span>
                                            </Label>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <RadioGroupItem id="private" value="private" />
                                            <Label htmlFor="private" className="grid gap-1 cursor-pointer">
                                                Private
                                                <span className="text-sm font-normal text-gray-500">Only available through a direct link.</span>
                                            </Label>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <RadioGroupItem id="unavailable" value="unavailable" />
                                            <Label htmlFor="unavailable" className="grid gap-1 cursor-pointer">
                                                Unavailable
                                                <span className="text-sm font-normal text-gray-500">Service cannot be booked.</span>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Photos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg min-h-[180px] text-center text-gray-500">
                                        <Camera className="w-10 h-10 mb-2" />
                                        <p className="text-sm">Drag and drop an image or click to upload</p>
                                        <p className="text-xs">PNG, JPG, up to 5MB</p>
                                        {/* In a real app, this would be an actual file input */}
                                        <Input type="file" className="sr-only" id="file-upload" />
                                        <Label htmlFor="file-upload" className="mt-2 cursor-pointer text-blue-600 hover:underline">
                                            Click to upload
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}