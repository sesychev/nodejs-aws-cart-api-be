#!/usr/bin/env node
import "source-map-support/register";
import { CartStack } from "../lib/cdk-stack";
import { App } from "aws-cdk-lib";

const app = new App();

new CartStack(app, "CartStack", {});

//app.synth();