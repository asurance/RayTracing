import { RecyclablePool } from '../Core/RecyclePool'
import type { RecyclableObj } from '../Core/RecyclePool'

export class Vector3 implements RecyclableObj<Vector3> {
    static Pool = new RecyclablePool(Vector3, 'Vector3');
    x: number;
    y: number;
    z: number;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }
    reset(): this { this.x = this.y = this.z = 0; return this }
    set(x: number, y: number, z: number): this {
        this.x = x
        this.y = y
        this.z = z
        return this
    }
    clone(out: Vector3 = Vector3.Pool.create()): Vector3 {
        out.x = this.x
        out.y = this.y
        out.z = this.z
        return out
    }
    length(): number {
        return Math.hypot(this.x, this.y, this.z)
    }
    sqauredLength(): number {
        return this.dot(this)
    }
    normalize(out = Vector3.Pool.create()): Vector3 {
        const length = this.length()
        if (length > 0) {
            this.multiScale(1 / length, out)
        }
        return out
    }
    add(vec3: Vector3, out = Vector3.Pool.create()): Vector3 {
        out.x = this.x + vec3.x
        out.y = this.y + vec3.y
        out.z = this.z + vec3.z
        return out
    }
    multiScale(scale: number, out = Vector3.Pool.create()): Vector3 {
        out.x = this.x * scale
        out.y = this.y * scale
        out.z = this.z * scale
        return out
    }
    multiVec3(vec3: Vector3, out = Vector3.Pool.create()): Vector3 {
        out.x = this.x * vec3.x
        out.y = this.y * vec3.y
        out.z = this.z * vec3.z
        return out
    }
    reciprocal(out = Vector3.Pool.create()): Vector3 {
        out.x = 1 / out.x
        out.y = 1 / out.y
        out.z = 1 / out.z
        return out
    }
    dot(vec3: Vector3): number {
        return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z
    }
    cross(vec3: Vector3, out = Vector3.Pool.create()): Vector3 {
        const x = this.y * vec3.z - this.z * vec3.y
        const y = this.z * vec3.x - this.x * vec3.z
        const z = this.x * vec3.y - this.y * vec3.x
        out.x = x
        out.y = y
        out.z = z
        return out
    }
    reflect(normal: Vector3, out = Vector3.Pool.create()): Vector3 {
        return Vector3.Pool.tidy(() => {
            return this.add(normal.multiScale(-2 * this.dot(normal)))
        }, out)
    }

    refract(normal: Vector3, n: number): Vector3 | null {
        const uv = this.normalize()
        const dt = uv.dot(normal)
        const discriminant = 1 - n * n * (1 - dt * dt)
        if (discriminant > 0) {
            const out = Vector3.Pool.tidy(() => {
                return uv.add(normal.multiScale(-dt)).multiScale(n).add(normal.multiScale(-Math.sqrt(discriminant)))
            })
            Vector3.Pool.reUse(uv)
            return out
        } else {
            Vector3.Pool.reUse(uv)
            return null
        }
    }
    toString(): string {
        return `(${this.x},${this.y},${this.z})`
    }
}