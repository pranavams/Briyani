package com.touchmark.briyani.rider.controller;

import java.util.List;

import com.touchmark.briyani.rider.bo.Rider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RiderResponse {
	private List<Rider> rider;
}
