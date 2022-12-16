<script setup lang="ts" >
    const props = defineProps<{headTitle: string}>()
</script>

<template>
    <header class="header">
        <h5 class="title" >{{props.headTitle}}</h5>
    </header>

</template>

<style  scoped>
    .header {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title {
        color: #d00;
        font-size: 22px;
        text-shadow: 1px 1px #f1f1f1;
    }

</style>