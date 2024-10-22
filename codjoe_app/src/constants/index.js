import { useState, useEffect, useRef } from 'react';

// export default function useComponentVisible(initialIsVisible) {
//     const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
//     const ref = useRef(null);

//     const handleClickOutside = (event) => {
//         if (ref.current && !ref.current.contains(event.target)) {
//             setIsComponentVisible(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside, true);
//         return () => {
//             document.removeEventListener('click', handleClickOutside, true);
//         };
//     }, []);

//     return { ref, isComponentVisible, setIsComponentVisible };
// }


const categories = [
    {
        id: 1,
        name: 'Tops',
        link: '/list/tops',
        img: '/images/tops.png'
    },
    {
        id: 2,
        name: 'Bottoms',
        link: '/list/bottoms',
        img: '/images/bottoms.png'
    },
    {
        id: 3,
        name: 'Accessories',
        link: '/list/accessories',
        img: '/images/shoes.png'
    },
    {
        id: 4,
        name: 'Collections',
        link: '/list/collections',
        img: '/images/accessories.png'
    },
    {
        id: 5,
        name: 'Limited Edition',
        link: '/list/limited-edition',
        img: '/images/limited-edition.png'
    }
]

const tops = [
    {
        id: 1,
        name: 'Codjoe Red Shirt',
        price: '$59.95',
        img: '/images/red-shirt.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 2,
        name: 'Codjoe Blue Shirt',
        price: '$59.95',
        img: '/images/blue-shirt.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 3,
        name: 'Codjoe Green Shirt',
        price: '$59.95',
        img: '/images/green-shirt.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 4,
        name: 'Codjoe Yellow Shirt',
        price: '$59.95',
        img: '/images/yellow-shirt.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 5,
        name: 'Codjoe Orange Shirt',
        price: '$59.95',
        img: '/images/orange-shirt.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 6,
        name: 'Codjoe Purple Shirt',
        price: '$59.95',
        img: '/images/purple-shirt.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 7,
        name: 'Codjoe Pink Shirt',
        price: '$59.95',
        img: '/images/pink-shirt.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
]

const bottoms = [
    {
        id: 1,
        name: 'Codjoe Red Pants',
        price: '$59.95',
        img: '/images/red-pants.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 2,
        name: 'Codjoe Blue Pants',
        price: '$59.95',
        img: '/images/blue-pants.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 3,
        name: 'Codjoe Green Pants',
        price: '$59.95',
        img: '/images/green-pants.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 4,
        name: 'Codjoe Yellow Pants',
        price: '$59.95',
        img: '/images/yellow-pants.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 5,
        name: 'Codjoe Orange Pants',
        price: '$59.95',
        img: '/images/orange-pants.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 6,
        name: 'Codjoe Purple Pants',
        price: '$59.95',
        img: '/images/purple-pants.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
        id: 7,
        name: 'Codjoe Pink Pants',
        price: '$59.95',
        img: '/images/pink-pants.png',
        soldOut: true,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
]

export { tops, bottoms, categories };