from django.shortcuts import render


def home(request):
    hero_features = [
        {
            "label": "Mens drop",
            "title": "Oversized layers",
            "copy": "Varsity zips, cargos, washed denim",
            "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "tone": "orange",
        },
        {
            "label": "Womens drop",
            "title": "After-dark color",
            "copy": "Sharp silhouettes with mirror-ready energy",
            "image": "https://images.unsplash.com/photo-1761167474127-1c6e596ecea6?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "tone": "teal",
        },
    ]

    hero_note = {
        "label": "New capsule",
        "title": "Campus to concert",
        "copy": "Utility denim, graphic hoodies, and low-effort statement styling with added motion and a real 360 viewer.",
    }

    viewer_presets = [
        {
            "id": "mens",
            "label": "Mens fit",
            "title": "Utility stacked look",
            "description": "Oversized outerwear, relaxed cargos, and grounded sneakers for a sharp everyday silhouette.",
            "chips": ["Oversized jacket", "Stacked cargos", "Street sneakers"],
        },
        {
            "id": "womens",
            "label": "Womens fit",
            "title": "Color-led mirror look",
            "description": "Cropped jacket proportions, wide-leg balance, and cleaner accent tones built for styled photo moments.",
            "chips": ["Cropped layer", "Wide-leg drape", "Gloss accents"],
        },
        {
            "id": "unisex",
            "label": "Unisex fit",
            "title": "Soft motion hoodie edit",
            "description": "A comfort-first hoodie and cargo mix that still reads styled from every side of the turntable.",
            "chips": ["Soft hoodie", "Neutral cargo", "Bold strap detail"],
        },
    ]

    collections = [
        {
            "name": "Signal Overshirts",
            "tag": "Mens",
            "price": "From Rs. 1,999",
            "accent": "Electric utility layers for everyday fits.",
            "image": "https://images.unsplash.com/photo-1771919371651-04d6ec4c239a?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "mood": "orange",
            "badge": "New drop",
        },
        {
            "name": "Metro Cargo Stack",
            "tag": "Mens",
            "price": "From Rs. 2,499",
            "accent": "Relaxed cargos and stacked hems tuned for all-day streetwear.",
            "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "mood": "orange",
            "badge": "Best seller",
        },
        {
            "name": "Slate Varsity Zip",
            "tag": "Mens",
            "price": "From Rs. 2,799",
            "accent": "Sharp varsity texture with an oversized zip cut for layered fits.",
            "image": "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "mood": "teal",
            "badge": "Limited",
        },
        {
            "name": "Afterglow Street Set",
            "tag": "Womens",
            "price": "From Rs. 2,299",
            "accent": "Sharp color pops, easy denim, late-night energy.",
            "image": "https://images.unsplash.com/photo-1761167474127-1c6e596ecea6?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "mood": "teal",
            "badge": "Trending",
        },
        {
            "name": "Prism Co-ord Mini",
            "tag": "Womens",
            "price": "From Rs. 2,699",
            "accent": "Coordinated color with just enough structure for dressed-up casual.",
            "image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "mood": "yellow",
            "badge": "New shade",
        },
        {
            "name": "Aura Mesh Layer",
            "tag": "Womens",
            "price": "From Rs. 1,699",
            "accent": "A lightweight statement layer made for sharp photos and easy styling.",
            "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "mood": "teal",
            "badge": "Hot pick",
        },
        {
            "name": "Dual Tone Caps",
            "tag": "Unisex",
            "price": "From Rs. 899",
            "accent": "Street-coded accessories made for quick styling wins.",
            "image": "https://images.unsplash.com/photo-1553247407-23251ce81f59?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "mood": "yellow",
            "badge": "Under Rs. 999",
        },
        {
            "name": "Cloud Nine Hoodie",
            "tag": "Unisex",
            "price": "From Rs. 1,899",
            "accent": "Soft fleece volume with a clean front made for repeat wear.",
            "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&fm=jpg&q=80&w=900",
            "mood": "orange",
            "badge": "Restocked",
        },
    ]

    featured_lines = [
        {
            "title": "Campus Core",
            "copy": "Baggy denim, cropped layers, varsity textures, and clean sneakers for everyday rotation.",
            "badge": "Daily flex",
        },
        {
            "title": "Night Shift",
            "copy": "Statement blacks, metallic accents, and flash-ready silhouettes for after-hours energy.",
            "badge": "Party edit",
        },
        {
            "title": "Soft Motion",
            "copy": "Oversized hoodies, co-ords, and lounge-led fits that still look styled outside the house.",
            "badge": "Comfort edit",
        },
    ]

    categories = [
        {
            "slug": "all",
            "label": "All Drops",
            "eyebrow": "Mixed heat",
            "title": "Everything Gen Z is wearing this season.",
            "description": "From relaxed tailoring to easy streetwear staples, this feed balances campus, concert, and content-day energy.",
            "highlights": ["Cargos + baby tees", "Layered hoodies", "Bold accessories"],
            "count": "84 live styles",
            "cta": "View full catalog",
        },
        {
            "slug": "mens",
            "label": "Mens",
            "eyebrow": "For him",
            "title": "Built around oversized confidence and clean utility pieces.",
            "description": "Relaxed shirts, textured jackets, cargo fits, and sneaker-led styling keep the menswear rack sharp without trying too hard.",
            "highlights": ["Boxy overshirts", "Street denim", "Monochrome kicks"],
            "count": "42 mens looks",
            "cta": "Shop mens fit guide",
        },
        {
            "slug": "womens",
            "label": "Womens",
            "eyebrow": "For her",
            "title": "Trend-aware fits with color, shape, and movement.",
            "description": "Think crop layers, relaxed tailoring, coordinated sets, and standout accessories designed for bold mirror-check moments.",
            "highlights": ["Mini + maxi mix", "Pop-color hoodies", "Statement shades"],
            "count": "38 womens looks",
            "cta": "Shop womens spotlight",
        },
    ]

    spotlights = [
        {
            "slug": "mens",
            "label": "Mens Highlight",
            "shop_label": "Mens",
            "title": "Menswear that lands between oversized and polished.",
            "description": "Built around cargos, varsity outerwear, washed denim, and tonal sneakers so every piece layers into a confident everyday look.",
            "image": "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&fm=jpg&q=80&w=1200",
            "note": "Most wanted: varsity zips + utility cargos",
            "highlights": ["Relaxed tailoring", "Street utility", "Daily neutrals"],
            "stat": "42 styles",
            "substat": "new mens arrivals",
        },
        {
            "slug": "womens",
            "label": "Womens Highlight",
            "shop_label": "Womens",
            "title": "Womens edits with brighter color and sharper shape play.",
            "description": "Co-ords, mesh layers, cropped outerwear, and standout accessories turn the womens section into a louder, more editorial part of the homepage.",
            "image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&fm=jpg&q=80&w=1200",
            "note": "Top edit: color-led co-ords for quick styling",
            "highlights": ["Pop-color layers", "Mirror-ready sets", "After-dark details"],
            "stat": "38 styles",
            "substat": "new womens arrivals",
        },
    ]

    shop_pills = [
        "Oversized fits",
        "Street denim",
        "Graphic hoodies",
        "Co-ords",
        "Accessories",
        "Sneaker-ready looks",
    ]

    brands = [
        "NOVA/01",
        "RIFT",
        "BLINK CULT",
        "NEON LANE",
        "FREQ",
        "AFTERHOURS",
        "WILDTHREAD",
        "CLOUD CTRL",
    ]

    context = {
        "hero_features": hero_features,
        "hero_note": hero_note,
        "viewer_presets": viewer_presets,
        "collections": collections,
        "featured_lines": featured_lines,
        "categories": categories,
        "spotlights": spotlights,
        "shop_pills": shop_pills,
        "brands": brands,
    }
    return render(request, "storefront/home.html", context)
