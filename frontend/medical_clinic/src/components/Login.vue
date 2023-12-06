<template>
    <form>
        <h3>Login</h3>

        <div class="form-group my-3">
            <label class="mb-1" style="font-weight: bold;">Email</label>
            <input type="email" class="form-control mb-1" placeholder="Email...">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group my-3">
            <label class="mb-1" style="font-weight: bold;">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
</template>

<script>
export default {
    name: 'Login'
}
</script>
