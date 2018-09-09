
export const registry = new Map<string, any>();

export function getComponent (name: string) : any {
    return registry.get(name);
}

export function getAllComponents () : any[] {
    return Array.from(registry.values());
}

export function register (name: string) {
    return function(comp: any) {
        registry.set(name, comp);
    }
}