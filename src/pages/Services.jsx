"use client"
import { useState, useMemo, useCallback, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Card } from "../components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "../components/ui/sheet"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Plus, Search, Pencil, Trash, MoreHorizontal, Shapes } from "lucide-react"
import { Skeleton } from "../components/ui/skeleton"
import PageHeader from '../components/PageHeader'

// Helper functions for formatting
function formatDuration(seconds) {
    if (seconds === 0) return "0min"
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    let result = ""
    if (hours > 0) {
        result += `${hours}h `
    }
    if (minutes > 0 || hours === 0) {
        result += `${minutes}min`
    }
    return result.trim()
}
function formatPrice(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}

// Initial dummy data
const initialCategories = [
    {
        id: "cat-1",
        name: "Salon",
        services: [
            {
                id: "svc-1",
                name: "Baby Salon",
                description: "Haircut for babies",
                color: "#FFD700",
                price: 100.0,
                duration: 1800, // 30 minutes
                category_id: "cat-1",
            },
            {
                id: "svc-2",
                name: "Gents Salon",
                description: "Haircut for men",
                color: "#4169E1",
                price: 100.0,
                duration: 5400, // 1h 30min
                category_id: "cat-1",
            },
        ],
    },
    {
        id: "cat-2",
        name: "Test",
        services: [
            {
                id: "svc-3",
                name: "asdfad",
                description: "A test service",
                color: "#FF69B4",
                price: 0.0,
                duration: 3600, // 1 hour
                category_id: "cat-2",
            },
        ],
    },
    {
        id: "cat-3",
        name: "Uncategorized",
        services: [],
    },
]

export default function ServicesDashboard() {
    const [categories, setCategories] = useState(initialCategories)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("name-ascending")
    const [isLoading, setIsLoading] = useState(true)

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    // State for Add Service Sheet
    const [isAddServiceSheetOpen, setIsAddServiceSheetOpen] = useState(false)
    const [currentCategoryForNewService, setCurrentCategoryForNewService] = useState(null)

    // State for Category Management Sheet (for both adding and editing)
    const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false)
    const [categoryToEdit, setCategoryToEdit] = useState(null)

    // State for Edit Service Sheet
    const [isEditServiceSheetOpen, setIsEditServiceSheetOpen] = useState(false)
    const [serviceToEdit, setServiceToEdit] = useState(null)

    // --- Category Management ---
    const handleCategorySaved = useCallback((savedCategory) => {
        setCategories((prevCategories) => {
            const existingIndex = prevCategories.findIndex((cat) => cat.id === savedCategory.id)
            if (existingIndex > -1) {
                return prevCategories.map((cat) => (cat.id === savedCategory.id ? savedCategory : cat))
            } else {
                return [...prevCategories, savedCategory]
            }
        })
    }, [])

    const openAddCategorySheet = () => {
        setCategoryToEdit(null)
        setIsCategorySheetOpen(true)
    }

    const openEditCategorySheet = (category) => {
        setCategoryToEdit(category)
        setIsCategorySheetOpen(true)
    }

    const handleDeleteCategory = (categoryId) => {
        if (confirm("Are you sure you want to delete this category and all its services?")) {
            setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== categoryId))
        }
    }

    // --- Service Management ---
    const handleServiceAdded = useCallback((newService) => {
        setCategories((prevCategories) =>
            prevCategories.map((cat) =>
                cat.id === newService.category_id ? { ...cat, services: [...cat.services, newService] } : cat,
            ),
        )
    }, [])

    const handleServiceSaved = useCallback((updatedService) => {
        setCategories((prevCategories) =>
            prevCategories
                .map((cat) => {
                    if (cat.id === updatedService.category_id) {
                        return {
                            ...cat,
                            services: cat.services.map((svc) => (svc.id === updatedService.id ? updatedService : svc)),
                        }
                    } else {
                        const oldCategory = prevCategories.find((c) => c.services.some((s) => s.id === updatedService.id))
                        if (oldCategory && oldCategory.id !== updatedService.category_id) {
                            return {
                                ...cat,
                                services: cat.services.filter((svc) => svc.id !== updatedService.id),
                            }
                        }
                    }
                    return cat
                })
                .map((cat) => {
                    if (cat.id === updatedService.category_id && !cat.services.some((s) => s.id === updatedService.id)) {
                        return {
                            ...cat,
                            services: [...cat.services, updatedService],
                        }
                    }
                    return cat
                }),
        )
    }, [])

    const openAddServiceSheet = (categoryId = null) => {
        setCurrentCategoryForNewService(categoryId)
        setIsAddServiceSheetOpen(true)
    }

    const openEditServiceSheet = (service) => {
        setServiceToEdit(service)
        setIsEditServiceSheetOpen(true)
    }

    const handleDeleteService = (serviceId) => {
        if (confirm("Are you sure you want to delete this service?")) {
            setCategories((prevCategories) =>
                prevCategories.map((cat) => ({
                    ...cat,
                    services: cat.services.filter((service) => service.id !== serviceId),
                })),
            )
        }
    }

    // --- Search and Sort Logic ---
    const filteredAndSortedCategories = useMemo(() => {
        let currentCategories = categories.map((cat) => ({ ...cat, services: [...cat.services] }))

        // Filter
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase()
            currentCategories = currentCategories.map((category) => ({
                ...category,
                services: category.services.filter(
                    (service) =>
                        service.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                        formatDuration(service.duration).toLowerCase().includes(lowerCaseSearchTerm) ||
                        formatPrice(service.price).toLowerCase().includes(lowerCaseSearchTerm),
                ),
            }))
        }

        // Sort services within each category
        currentCategories = currentCategories.map((category) => {
            const sortedServices = [...category.services].sort((a, b) => {
                switch (sortBy) {
                    case "name-ascending":
                        return a.name.localeCompare(b.name)
                    case "name-descending":
                        return b.name.localeCompare(a.name)
                    case "price-ascending":
                        return a.price - b.price
                    case "price-descending":
                        return b.price - a.price
                    default:
                        return 0
                }
            })
            return { ...category, services: sortedServices }
        })

        return currentCategories
    }, [categories, searchTerm, sortBy])

    // --- Drag and Drop Handlers ---
    const handleDragStart = (e, serviceId, categoryId) => {
        e.dataTransfer.setData("serviceId", serviceId)
        e.dataTransfer.setData("sourceCategoryId", categoryId)
        e.dataTransfer.effectAllowed = "move"
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (e, targetCategoryId) => {
        e.preventDefault()
        const serviceId = e.dataTransfer.getData("serviceId")
        const sourceCategoryId = e.dataTransfer.getData("sourceCategoryId")

        if (serviceId && sourceCategoryId && sourceCategoryId !== targetCategoryId) {
            setCategories((prevCategories) => {
                let serviceToMove = null
                const updatedCategories = prevCategories.map((cat) => {
                    if (cat.id === sourceCategoryId) {
                        const serviceIndex = cat.services.findIndex((s) => s.id === serviceId)
                        if (serviceIndex > -1) {
                            serviceToMove = cat.services[serviceIndex]
                            return {
                                ...cat,
                                services: cat.services.filter((s) => s.id !== serviceId),
                            }
                        }
                    }
                    return cat
                })

                if (serviceToMove) {
                    return updatedCategories.map((cat) => {
                        if (cat.id === targetCategoryId) {
                            return {
                                ...cat,
                                services: [...cat.services, { ...serviceToMove, category_id: targetCategoryId }],
                            }
                        }
                        return cat
                    })
                }
                return prevCategories
            })
        }
    }

    // --- Inline Add Service Sheet Component ---
    const AddServiceSheet = ({ isOpen, onOpenChange, categories, onServiceAdded, initialCategoryId }) => {
        const [name, setName] = useState("")
        const [description, setDescription] = useState("")
        const [color, setColor] = useState("#CCCCCC")
        const [price, setPrice] = useState("")
        const [durationMinutes, setDurationMinutes] = useState("")
        const [categoryId, setCategoryId] = useState(initialCategoryId || (categories.length > 0 ? categories[0].id : ""))
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [error, setError] = useState(null)

        useEffect(() => {
            if (isOpen) {
                setName("")
                setDescription("")
                setColor("#CCCCCC")
                setPrice("")
                setDurationMinutes("")
                setCategoryId(initialCategoryId || (categories.length > 0 ? categories[0].id : ""))
                setError(null)
            }
        }, [isOpen, initialCategoryId, categories])

        const handleSubmit = (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setError(null)

            if (!name.trim() || !price || !durationMinutes || !categoryId) {
                setError("Please fill in all required fields (Name, Price, Duration, Category).")
                setIsSubmitting(false)
                return
            }

            const newService = {
                id: `svc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                name: name.trim(),
                description: description.trim(),
                color: color,
                price: Number.parseFloat(price),
                duration: Number.parseInt(durationMinutes) * 60,
                category_id: categoryId,
            }

            try {
                onServiceAdded(newService)
                onOpenChange(false)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsSubmitting(false)
            }
        }

        return (
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>Add New Service</SheetTitle>
                        <SheetDescription>Fill in the details for your new service.</SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-service-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="add-service-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-service-description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="add-service-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-service-color" className="text-right">
                                Color
                            </Label>
                            <Input
                                id="add-service-color"
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="col-span-3 h-10"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-service-price" className="text-right">
                                Price ($)
                            </Label>
                            <Input
                                id="add-service-price"
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-service-duration" className="text-right">
                                Duration (min)
                            </Label>
                            <Input
                                id="add-service-duration"
                                type="number"
                                value={durationMinutes}
                                onChange={(e) => setDurationMinutes(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="add-service-category" className="text-right">
                                Category
                            </Label>
                            <Select value={categoryId} onValueChange={setCategoryId}>
                                <SelectTrigger id="add-service-category" className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <SheetFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create Service"}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        )
    }

    // --- Inline Category Management Sheet Component ---
    const CategoryManagementSheet = ({ isOpen, onOpenChange, categoryToEdit, onCategorySaved }) => {
        const [name, setName] = useState("")
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [error, setError] = useState(null)
        const isEditing = !!categoryToEdit

        useEffect(() => {
            if (isOpen) {
                setName(isEditing ? categoryToEdit.name : "")
                setError(null)
            }
        }, [isOpen, isEditing, categoryToEdit])

        const handleSubmit = (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setError(null)

            if (!name.trim()) {
                setError("Category name cannot be empty.")
                setIsSubmitting(false)
                return
            }

            const categoryData = {
                name: name.trim(),
            }

            try {
                if (isEditing) {
                    onCategorySaved({ ...categoryToEdit, ...categoryData })
                } else {
                    onCategorySaved({
                        id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                        ...categoryData,
                        services: [],
                    })
                }
                onOpenChange(false)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsSubmitting(false)
            }
        }

        return (
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>{isEditing ? "Edit Category" : "Add New Category"}</SheetTitle>
                        <SheetDescription>
                            {isEditing ? "Update the details for this category." : "Enter the name for your new category."}
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="category-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <SheetFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting
                                    ? isEditing
                                        ? "Saving..."
                                        : "Creating..."
                                    : isEditing
                                        ? "Save Changes"
                                        : "Create Category"}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        )
    }

    // --- Inline Edit Service Sheet Component ---
    const EditServiceSheet = ({ isOpen, onOpenChange, serviceToEdit, categories, onServiceSaved }) => {
        const [name, setName] = useState("")
        const [description, setDescription] = useState("")
        const [color, setColor] = useState("#CCCCCC")
        const [price, setPrice] = useState("")
        const [durationMinutes, setDurationMinutes] = useState("")
        const [categoryId, setCategoryId] = useState("")
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [error, setError] = useState(null)

        useEffect(() => {
            if (isOpen && serviceToEdit) {
                setName(serviceToEdit.name || "")
                setDescription(serviceToEdit.description || "")
                setColor(serviceToEdit.color || "#CCCCCC")
                setPrice(serviceToEdit.price !== undefined ? serviceToEdit.price.toString() : "")
                setDurationMinutes(serviceToEdit.duration !== undefined ? (serviceToEdit.duration / 60).toString() : "")
                setCategoryId(serviceToEdit.category_id || (categories.length > 0 ? categories[0].id : ""))
                setError(null)
            }
        }, [isOpen, serviceToEdit, categories])

        const handleSubmit = (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setError(null)

            if (!name.trim() || !price || !durationMinutes || !categoryId) {
                setError("Please fill in all required fields (Name, Price, Duration, Category).")
                setIsSubmitting(false)
                return
            }

            const updatedService = {
                ...serviceToEdit,
                name: name.trim(),
                description: description.trim(),
                color: color,
                price: Number.parseFloat(price),
                duration: Number.parseInt(durationMinutes) * 60,
                category_id: categoryId,
            }

            try {
                onServiceSaved(updatedService)
                onOpenChange(false)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsSubmitting(false)
            }
        }

        return (
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>Edit Service</SheetTitle>
                        <SheetDescription>Update the details for this service.</SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-service-name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="edit-service-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-service-description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="edit-service-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-service-color" className="text-right">
                                Color
                            </Label>
                            <Input
                                id="edit-service-color"
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="col-span-3 h-10"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-service-price" className="text-right">
                                Price ($)
                            </Label>
                            <Input
                                id="edit-service-price"
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-service-duration" className="text-right">
                                Duration (min)
                            </Label>
                            <Input
                                id="edit-service-duration"
                                type="number"
                                value={durationMinutes}
                                onChange={(e) => setDurationMinutes(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-service-category" className="text-right">
                                Category
                            </Label>
                            <Select value={categoryId} onValueChange={setCategoryId}>
                                <SelectTrigger id="edit-service-category" className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <SheetFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <div className="animate-fade-in">
            <PageHeader 
                title="Services" 
                description="Manage your business services and offerings."
                actions={
                    <Button
                        className="btn btn-primary flex items-center gap-2"
                        onClick={() => openAddServiceSheet(categories[0]?.id || "uncategorized")}
                    >
                        <Plus className="w-4 h-4" />
                        Add Service
                    </Button>
                }
            />

            <div className="space-y-6">
                {isLoading ? (
                    <>
                        {/* Skeleton for Search and Sort Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <Skeleton className="h-10 w-full max-w-sm" />
                            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-[180px]" />
                            </div>
                        </div>

                        {/* Skeleton for Categories and Services */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-5 w-12 rounded-full" />
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-9 w-28" />
                                        <Skeleton className="h-9 w-9 rounded-md" />
                                        <Skeleton className="h-9 w-9 rounded-md" />
                                        <Skeleton className="h-9 w-9 rounded-md" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {[1, 2].map((j) => (
                                        <Card key={j} className="flex items-center p-4 shadow-sm">
                                            <Skeleton className="w-12 h-12 mr-4 rounded-full" />
                                            <div className="flex-grow space-y-1">
                                                <Skeleton className="h-5 w-3/4" />
                                                <Skeleton className="h-4 w-1/2" />
                                            </div>
                                            <Skeleton className="h-9 w-9 rounded-md ml-auto" />
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Skeleton for Add New Category Button */}
                        <div className="flex justify-end pt-6">
                            <Skeleton className="h-10 w-40" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="card">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="relative w-full max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <Input
                                        placeholder="Search services..."
                                        className="pl-9"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                    <span className="text-sm text-gray-600">Sort By:</span>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sort By" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="name-ascending">Name Ascending</SelectItem>
                                            <SelectItem value="name-descending">Name Descending</SelectItem>
                                            <SelectItem value="price-ascending">Price Ascending</SelectItem>
                                            <SelectItem value="price-descending">Price Descending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {filteredAndSortedCategories.map((category) => (
                            <div key={category.id} className="card">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                                    <h2 className="text-xl font-semibold flex items-center space-x-2">
                                        <span>{category.name}</span>
                                        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {category.services.length}
                                        </span>
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            className="text-purple-600 hover:text-purple-700"
                                            onClick={() => openAddServiceSheet(category.id)}
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Service
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => openEditCategorySheet(category)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setIsEditServiceSheetOpen(true)}>
                                                    Edit Service
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteService(serviceToEdit?.id)}>
                                                    Delete Service
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                {category.services.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {category.services.map((service) => (
                                            <Card
                                                key={service.id}
                                                className="flex items-center p-4 shadow-sm"
                                                draggable="true"
                                                onDragStart={(e) => handleDragStart(e, service.id, category.id)}
                                            >
                                                <Avatar className={`w-12 h-12 mr-4`} style={{ backgroundColor: service.color }}>
                                                    <AvatarFallback className="text-white text-lg">
                                                        {service.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-grow">
                                                    <h3 className="font-medium text-gray-800">{service.name}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDuration(service.duration)} / {formatPrice(service.price)}
                                                    </p>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="ml-auto text-gray-500 hover:text-gray-700">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditServiceSheet(service)}>
                                                            Edit Service
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDeleteService(service.id)}>
                                                            Delete Service
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4 bg-white"
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, category.id)}
                                    >
                                        <Shapes className="w-12 h-12 mx-auto text-gray-400" />
                                        <p className="text-gray-500">No services in this category yet.</p>
                                        <p className="text-sm text-gray-400">Drag and drop services here or add a new one.</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Add New Category Button */}
                        <div className="flex justify-end pt-6">
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={openAddCategorySheet}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Category
                            </Button>
                        </div>
                    </>
                )}
            </div>

            {/* Add Service Sheet */}
            <AddServiceSheet
                isOpen={isAddServiceSheetOpen}
                onOpenChange={setIsAddServiceSheetOpen}
                categories={categories}
                onServiceAdded={handleServiceAdded}
                initialCategoryId={currentCategoryForNewService}
            />
            
            {/* Category Management Sheet */}
            <CategoryManagementSheet
                isOpen={isCategorySheetOpen}
                onOpenChange={setIsCategorySheetOpen}
                categoryToEdit={categoryToEdit}
                onCategorySaved={handleCategorySaved}
            />
            
            {/* Edit Service Sheet */}
            <EditServiceSheet
                isOpen={isEditServiceSheetOpen}
                onOpenChange={setIsEditServiceSheetOpen}
                serviceToEdit={serviceToEdit}
                categories={categories}
                onServiceSaved={handleServiceSaved}
            />
        </div>
    )
}