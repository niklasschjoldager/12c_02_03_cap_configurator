"use strict";

// The model of all features
const features = {
    drinksholder: false,
    led: false,
    propeller: false,
    shield: false,
    solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");
    // register toggle-clicks
    document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
    const target = event.currentTarget;
    const feature = target.dataset.feature;

    // Toggle feature in "model"
    features[feature] = !features[feature];

    // If feature is (now) turned on:
    if (features[feature]) {
        // feature added
        console.log(`Feature ${feature} is turned on!`);
        // - mark target as chosen (add class "chosen")
        target.classList.add("chosen");
        // - un-hide the feature-layer(s) in the #product-preview;
        // Get all feature elements (e.g. sun shield has 2 images)
        const featureElements = document.querySelectorAll(`img[data-feature=${feature}]`);

        // Show all images
        featureElements.forEach((featureElement) => {
            featureElement.classList.remove("hide");
        });
        // - create featureElement and append to #selected ul
        // - create FLIP-animation to animate featureElement from img in target, to
        //   its intended position. Do it with normal animation or transition class!

        // TODO: More code
    } else {
        // Else - if the feature (became) turned off:
        // feature removed
        console.log(`Feature ${feature} is turned off!`);

        // - no longer mark target as chosen
        target.classList.remove("chosen");
        // - hide the feature-layer(s) in the #product-preview
        // Get all feature elements (e.g. sun shield has 2 images)
        const featureElements = document.querySelectorAll(`img[data-feature=${feature}]`);

        // Hide all images
        featureElements.forEach((featureElement) => {
            featureElement.classList.add("hide");
        });
        // - find the existing featureElement in #selected ul
        // - create FLIP-animation to animate featureElement to img in target
        // - when animation is complete, remove featureElement from the DOM

        // TODO: More code
    }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
    const li = document.createElement("li");
    li.dataset.feature = feature;

    const img = document.createElement("img");
    img.src = `images/feature_${feature}.png`;
    img.alt = capitalize(feature);

    li.append(img);

    return li;
}

function capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
