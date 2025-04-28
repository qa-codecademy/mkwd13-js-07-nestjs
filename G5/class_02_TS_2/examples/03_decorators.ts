import 'reflect-metadata';

// 1. Class Decorator
function Logger(prefix: string) {
	return function (target: Function) {
		console.log(`${prefix} [${target.name} class is defined]`);
	};
}

// 2. Method Decorator
function Log() {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			console.log(`Calling method ${propertyKey}`);
			const result = originalMethod.apply(this, args);
			console.log(`Method ${propertyKey} returned: ${result}`);
			return result;
		};
	};
}

// 3. Property Decorator
function MinLength(min: number) {
	console.log('Validating minimum length');
	return function (target: any, propertyKey: string) {
		// get the value
		let value: string;

		// Create a getter and setter
		const getter = function () {
			return value;
		};

		const setter = function (newValue: string) {
			if (newValue.length < min) {
				throw new Error(
					`${propertyKey} should be at least ${min} characters long.`
				);
			}
			value = newValue;
		};

		Object.defineProperty(target, propertyKey, {
			get: getter,
			set: setter,
		});
	};
}

// 4. Parameter Decorator
function Required(target: any, propertyKey: string, parameterIndex: number) {
	console.log('Require validating');
	const requiredParams =
		Reflect.getMetadata('required', target, propertyKey) || [];
	requiredParams.push(parameterIndex);
	Reflect.defineMetadata('required', requiredParams, target, propertyKey);
}

@Logger('ExampleApp')
export class User {
	@MinLength(2)
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	@Log()
	greet(@Required message: string): string {
		return `${this.name} says: ${message}`;
	}
}

// let body = zod({
// 	name: string().
// })

// class Body {
// 	@String()
// 	@MinLength(2)
// 	@kMaxLength(120)
// 	name: string
// }
