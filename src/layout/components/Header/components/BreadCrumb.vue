<script setup lang="ts">
  import { computed } from 'vue'
  import type { RouteLocationMatched } from 'vue-router'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const breads = computed(() => {
    const currentRoute = router.currentRoute
    return currentRoute.value.matched.filter((route) => route.meta.title)
  })

  const handleLink = (item: RouteLocationMatched) => {
    const { redirect } = item
    if (redirect) {
      router.push(redirect as any)
    }
  }
</script>

<template>
  <el-breadcrumb class="h-full flex items-center select-none" separator="/">
    <el-breadcrumb-item v-for="item in breads" :key="item.path" class="!items-stretch">
      <a @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
