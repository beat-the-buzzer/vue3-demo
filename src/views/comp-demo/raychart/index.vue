<script setup>
import { RayPie as pie } from 'raychart'
import 'raychart/dist/raychart.css'

const option = {
  "lights": [
    {
      "id": "1",
      "type": "Ambient",
      "color": "#ffffff",
      "intensity": 1.2
    },
    {
      "id": "2",
      "type": "Directional",
      "color": "#fffdf4",
      "intensity": 1.75,
      "position": {
        "x": 0,
        "y": 20,
        "z": 10
      },
      "castShadow": true
    },
    {
      "id": "3",
      "type": "Directional",
      "color": "#eaf2fc",
      "intensity": 0.75,
      "position": {
        "x": 0,
        "y": -10,
        "z": 5
      },
      "castShadow": false
    }
  ],
  "series": [
    {
      "type": "pie3D",
      "data": [
        {
          "value": 400,
          "name": "视频广告"
        },
        {
          "value": 335,
          "name": "直接访问"
        },
        {
          "value": 310,
          "name": "邮件营销"
        },
        {
          "value": 274,
          "name": "联盟广告"
        },
        {
          "value": 235,
          "name": "搜索引擎"
        }
      ],
      "color": [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de"
      ],
      "itemStyle": {
        "transmission": 0,
        "opacity": 0.85,
        "transparent": true,
        "roughness": 0.6,
        "metalness": 0,
        "clearcoat": 0.1,
        "clearcoatRoughness": 0.6,
        "envMapIntensity": 0.8,
        "reflectivity": 0.35,
        "specularIntensity": 0.25,
        "emissive": "#000000",
        "side": "double",
        "depthWrite": false
      },
      "innerRadius": 6,
      "depth": 2.5,
      "startAngle": 45,
      "label": {
        "show": true,
        "position": "outside",
        "distance": 1.2,
        "fontSize": 14,
        "color": "#333",
        "leaderLine": {
          "show": true,
          "type": "polyline",
          "length": [
            3,
            5
          ],
          "lineStyle": {
            "color": "#999999",
            "width": 1,
            "type": "solid",
            "opacity": 0.8
          }
        }
      }
    }
  ],
  "controlSettings": {
    "enableRotate": true,
    "enableZoom": true,
    "enablePan": true,
    "minPolarAngle": 0,
    "maxPolarAngle": 3.141592653589793,
    "fitToScreenFactor": 0.8,
    "cameraDirection": {
      "x": 1,
      "y": 1.5,
      "z": 1
    }
  },
  "postprocessing": {
    "bloom": {
      "enabled": true,
      "selective": true,
      "strength": 1.2,
      "radius": 0.4,
      "threshold": 0.6,
      "resolutionScale": 0.5
    }
  },
  "showLightHelpers": false
}
</script>

<template>
  <pie :option="option" height="460px" />
</template>