<script setup lang="ts">
import { MDCSlider } from '@material/slider';

/**
 * The value of the slider is an array of [start, end]
 */
const model = defineModel<number[]>();

const props = withDefaults(defineProps<{ min?: number, max?: number, minRange?: number, class?: string }>(), {
    min: 0,
    max: 60,
    minRange: 10
});

const slideRef = useTemplateRef('slideRef');
const slider = ref<MDCSlider | null>(null);
watch(slideRef, async () => {
    if (slideRef.value) {
        const step = props.minRange;
        const mid = (props.min + props.max) / 2;
        if (!model.value) model.value = [mid - step / 2, mid + step / 2];
        // Must set min/max/value for initial value to comply with material ui, so binding to props doesn't work.
        // binding ref and setting value to the element doesn't work, so I just use html string.
        slideRef.value.innerHTML = `<div class="mdc-slider__track">
            <div class="mdc-slider__track--inactive"></div>
            <div class="mdc-slider__track--active">
                <div class="mdc-slider__track--active_fill"></div>
            </div>
        </div>
        <div class="mdc-slider__thumb">
            <div class="mdc-slider__thumb-knob"></div>
            <input ref="input1Ref" class="mdc-slider__input" min="${props.min}" value="${model.value[0]}" type="range" name="rangeStart"
                aria-label="Continuous range slider demo">
        </div>
        <div class="mdc-slider__thumb">
            <div class="mdc-slider__thumb-knob"></div>
            <input ref="input2Ref" class="mdc-slider__input" max="${props.max}" value="${model.value[1]}" type="range" name="rangeEnd"
                aria-label="Continuous range slider demo">
        </div>`;
        await nextTick();

        slider.value = new MDCSlider(slideRef.value);
        slider.value.listen("MDCSlider:input", (e) => model.value = [slider.value!.getValueStart(), slider.value!.getValue()]);
    }

})


watch(model, async (val, old) => {
    if (!val || !slider.value) return;

    // Somehow setting both value at the same time break without timeout :/
    const jobs = [];

    if (!old || (val[0] !== old[0] && val[0] !== slider.value.getValueStart())) {
        jobs.push(() => slider.value!.setValueStart(val[0]));
    }

    if (!old || (val[1] !== old[1] && val[1] !== slider.value.getValue())) {
        jobs.push(() => { slider.value!.setValue(val[1]); });
    }

    if(jobs.length === 2 && val[0] >= slider.value.getValue()) {
        // Move end thumb first if the start thumb have to go over the current end thumb (otherwise material ui breaks)
        jobs.reverse();
    }

    for (const job of jobs) {
        job();
        await timeout(5);
    }
})

const clazz = computed(() => `mdc-slider mdc-slider--range min-h-12 ${props.class}`);
</script>

<style lang="scss">
@use "@material/slider/styles";
</style>

<template>
    <div ref="slideRef" :class="clazz" :data-min-range="minRange"></div>
</template>