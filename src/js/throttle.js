export function throttle(func, limit) { 
    let previous = 0; 
    return function() { 
        let now = Date.now(); 
        if (now - previous > limit) { 
            func.apply(null, arguments); 
            previous = now; 
        } 
    } 
} 