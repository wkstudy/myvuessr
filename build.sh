#!/bin/bash
rm -rf static
rm -rf  dist-client/*.html
mkdir static
mv dist-client/*  static
mv dist-server/*  static