package server.uilities;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.function.Supplier;

public abstract class TypeToken<TYPE>
        implements Supplier<Type> {

    private final Type type;

    protected TypeToken() {
        type = resolveType();
    }

    @Override
    public final Type get() {
        return type;
    }

    @SuppressWarnings("unchecked")
    public final Class<TYPE> getClazz() {
        return (Class<TYPE>) type;
    }

    @Override
    public final boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final TypeToken<?> that = (TypeToken<?>) o;
        return type.equals(that.type);
    }

    @Override
    public final int hashCode() {
        return type.hashCode();
    }

    @Override
    public final String toString() {
        return type.toString();
    }

    private Type resolveType() {
        @SuppressWarnings({"unchecked", "rawtypes"}) final Class<TypeToken<TYPE>> superclass = (Class) TypeToken.class;
        @SuppressWarnings("unchecked") final Class<? extends TypeToken<TYPE>> thisClass = (Class<TypeToken<TYPE>>) getClass();
        final Class<?> actualSuperclass = thisClass.getSuperclass();
        if (actualSuperclass != superclass) {
            throw new IllegalArgumentException(thisClass + " must extend " + superclass + " directly but it extends " + actualSuperclass);
        }
        final Type genericSuperclass = thisClass.getGenericSuperclass();
        if (!(genericSuperclass instanceof final ParameterizedType parameterizedGenericSuperclass)) {
            throw new IllegalArgumentException(thisClass + " must parameterize its superclass " + genericSuperclass);
        }
        final Type[] actualTypeArguments = parameterizedGenericSuperclass.getActualTypeArguments();
        if (actualTypeArguments.length != 1) {
            throw new AssertionError(actualTypeArguments.length);
        }
        return actualTypeArguments[0];
    }

}